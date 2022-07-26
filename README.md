# Multi_Fusion
个人职责：算法/前端开发/后端开发 工作内容：【后端】使用 Python+Flask 框架，实现后台搭建与整个项目的模块整合。基于 socket 连接池将识别请求发送至远程 GPU 节点，采用同步非阻塞模式实现请求结果的返回。利用 Redis 缓存数据库，基于图像 md5 技术，实现重复图像运行结果的快速返回。利用令牌桶算法，对网路请求数据进行限流。【算法】负责多源图像融合及多源体征数据融合的模块。前者基于像素级别的 IOU 融合策略；后者基于特征重要性分析技术，依赖多尺度时间门控扩散卷积及Transformer机制。【前端】使用Vue Element+Node.js实现整个项目网页App的开发。 
出于保密需要，本项目只提供前端实现代码。后端部分技术要点如下：

**备注：** 本博文梳理总结多源数据融合项目中用到的技术点，由于保密要求，只展示技术点的 demo 代码，不会涉及原项目代码。
### 1 项目框架
![](https://img2022.cnblogs.com/blog/1466728/202207/1466728-20220726105704679-1514618209.png)
本项目背景要求，GPU 节点无法连接外网，客户端通过外网 IP 访问服务器，服务器通过内网 IP 与 GPU 节点进行通信。
GPU 节点 与 服务器运行的都是 Flask Web。
> 关于 Flask 的文档：https://flask.palletsprojects.com/en/2.1.x/

```python
from flask import Flask, url_for, redirect, request, render_template, g, Response, send_from_directory, make_response,  jsonify
app = Flask(__name__)

# 对Client发送的image-form请求进行接收
@app.route('/upload_image', methods=['post'])
def upload_image():
upload_img_path = basedir + "/src/img/"
mode = request.values.get('mode')
if mode == "1":
  ....
else mode == "2":
  ...
else ...
  ...
else
  ...
```

服务器起转发请求的作用。为了实现高并发，我们使用线程池的技术。当客户端发起一个请求，服务器服务器获取请求数据 `mode = request.values.get('mode') img = request.files['xxx']`，并将该请求放入缓冲区 `Queue 类`，然后线程池里的单个线程获取任务请求，通过 `request 库` 向 GPU 节点发起请求。

#### 技术点 1 生产者-消费者模型 
> 参考链接1：https://blog.csdn.net/qq_52007481/article/details/125673224
> 参考链接2：https://segmentfault.com/a/1190000008909344

使用 Python 内置的 queue 模块。客户端发起请求，服务器获取请求数据，然后将请求数据插入到任务队列 `Queue`，
```python
from queue import Queue    # queue模块是Python内置的标准模块
import random,threading,time

#生产者类
class Producer(threading.Thread):
    def __init__(self, name,queue):
        threading.Thread.__init__(self, name=name)
        self.data=queue

    def run(self):
        for i in range(5):
            print("%s is producing %d to the queue!" % (self.getName(), i))
            self.data.put(i)
            time.sleep(random.randrange(10)/5)
        print("%s finished!" % self.getName())

#消费者类
class Consumer(threading.Thread):
    def __init__(self,name,queue):
        threading.Thread.__init__(self,name=name)
        self.data=queue
    def run(self):
        for i in range(5):
            val = self.data.get()
            print("%s is consuming. %d in the queue is consumed!" % (self.getName(),val))
            time.sleep(random.randrange(10))
        print("%s finished!" % self.getName())

def main():
    MAX_CLIENT = 100
    queue = Queue(MAX_CLIENT)
    producer = Producer('Producer',queue)
    consumer = Consumer('Consumer',queue)

    producer.start()
    consumer.start()

    producer.join()
    consumer.join()
    print 'All threads finished!'

if __name__ == '__main__':
    main()
```

#### 技术点 2 服务器作为客户端使用 request 库向 GPU 节点发起请求
> 参考链接：https://www.cnblogs.com/miki-peng/p/13512436.html

下面以请求百度为例，发送 get 请求：
```python
import requests

# 通过url直接加上请求参数，与通过params传参效果是一样的
response = requests.get(url='http://www.baidu.com/s?wd=requests模块')
# 通过params传参
response2 = requests.get(url='http://www.baidu.com/s', params={"wd": "requests模块"})
print(response.status_code)		# 打印状态码
# print(response.text)		# 获取响应内容
```

发送 post 请求：
```python
register_url = "http://127.0.0.1:666/index/register"

# 添加请求头，需要就传
header = {
    "Content-Type": "application/json"
}

# json类型的参数
json = {
    "mobile_phone": "15612345678",
    "pwd": "Test1234",
    "type": 0
}
# 发送post请求
response = requests.post(url=register_url, json=json, headers=header)
print(response.json())
```

### 2 基于图片 md5 的 Redis 缓存优化
由于调用模型对某一模块的识别是比较耗时的。考虑这么一种情况：用户对同组数据发起了多次请求。
我们使用图像 md5 技术，唯一标识请求图片，若该组数据已经返回过识别结果数据，则将其以 md5 联合为 key，以识别结果为 value进行存储。

```python
from hashlib import md5
import redis
redis_db = redis.Redis(host='127.0.0.1', port=6379, db=1)
# 对Client发送的image-form请求进行接收
@app.route('/xxx', methods=['post'])
def upload_image():
mode = request.values.get('mode')
    #下述每个模式都生成处理后的image及记录该Image检测信息的json
    if mode == "1":
      ....
      hash = md5()
      hash.update(img.read())
      hex_digest = hash.hexdigest()
      key = '{}:{}'.format(upload_img_path, hex_digest)
      check_result = redis_db.get(key)
      if (check_result != None):
         print("Redis缓存读取数据")
         return check_result
```

### 3 基于令牌桶技术的限流
为了防止客户端对于接口的滥用，保护服务器的资源，需要对服务器上的各种接口进行 调用次数的限制。服务接口的流量控制策略包括：分流、降级、限流。本项目仅仅使用了令牌桶限流技术。
> 参考我的这篇博客：https://www.cnblogs.com/MasterBean/p/16408129.html

```python
def can_pass_token_bucket(rate=0.5, capacity=30):
    """
    :param time_zone: 接口限制的时间段
    :param times: 限制的时间段内允许多少请求通过
    """
    key = "Interface1"
    rate = rate
    capacity = capacity
    tokens = redis_db.hget(key, 'tokens')  # 看桶中有多少令牌
    last_time = redis_db.hget(key, 'last_time')  # 上次令牌生成时间
    now = time.time()
    tokens = int(tokens) if tokens else capacity
    last_time = int(last_time) if last_time else now
    delta_tokens = (now - last_time) * rate  # 经过一段时间后生成的令牌
    if delta_tokens >= 1:
        tokens = tokens + delta_tokens  # 增加令牌
        if tokens > capacity:
            tokens = capacity
        last_time = time.time()  # 记录令牌生成时间
        redis_db.hset(key, 'last_time', last_time)

    if tokens >= 1:
        tokens -= 1  # 请求进来了，令牌就减少1
        redis_db.hset(key, 'tokens', tokens)
        return True
    return False

@app.route('/xxx', methods=['post'])
def upload_image():
    mode = request.values.get('mode')
    #下述每个模式都生成处理后的image及记录该Image检测信息的json
    if mode == "1":
        ...
        interfaceOK = can_pass_token_bucket(rate, capacity)
        if interfaceOK == False:
            return jsonify({"message": "token shortage!!"})
```

### 4 基于 IOU 的多源图像融合算法
可见光图像使用 YOLOv4 检测，红外图像使用 HOG+SVM 进行检测。
本模块仅简述如何进行结果级别的融合。其思想来源于 YOLOv4 的 IOU 与 NMS。

> NMS 理论参考链接：https://zhuanlan.zhihu.com/p/348777945
> 具体实现讲解，我的 B 站：https://www.bilibili.com/video/BV14b4y1R7Wv?spm_id_from=333.999.0.0
> 我的专利：https://www.patentguru.com/cn/inventor/%E9%A1%BE%E6%99%B6%E6%99%B6

核心代码 demo：
```python 
  #热成像图中预测框的坐标数据
  Infra_red = []
  InfraRed_confidence = []
  #载入Json数据
  with open(InfraRedLine_json, encoding="utf-8") as load_f:
      load_dict = json.load(load_f)
      #mark:在这里load_f.close会不会导致load_dict..?
      load_f.close()

  InfraRed_boxes_package = load_dict['boxes']
  InfraRed_count = load_dict['count']

  for index in range(InfraRed_count):
      boxes_item = InfraRed_boxes_package[index]
      coordinates = boxes_item["coordinates"]
      InfraRed_confidence.append(boxes_item["confidence"])
      Infra_red.append(coordinates)
      
  # 去掉灰条
  boxes = yolo_correct_boxes(top_ymin,top_xmin,top_ymax,top_xmax,np.array([self.model_image_size[0],self.model_image_size[1]]),image_shape)
  font_path = basedir + "/Yolov4_Detection/model_data/simhei.ttf"
  font = ImageFont.truetype(font=font_path,
                            size=np.floor(3e-2 * np.shape(image)[1] + 0.5).astype('int32'))

  thickness = (np.shape(image)[0] + np.shape(image)[1]) // self.model_image_size[0]
  label_size = (45,10)
  predicted_class = "person"
  # UAV存的是UAV检测出来的目标中的人体目标
  UAV = []
  UAV_confidence = []
  for i, c in enumerate(top_label):
      # 只有当检测对象时person的时候，才记录
      if int(c) != 0:
          continue
      predicted_class = self.class_names[c]
      score = top_conf[i]
      top, left, bottom, right = boxes[i]
      top = top - 5
      left = left - 5
      bottom = bottom + 5
      right = right + 5

      top = max(0, np.floor(top + 0.5).astype('int32'))
      left = max(0, np.floor(left + 0.5).astype('int32'))
      bottom = min(np.shape(image)[0], np.floor(bottom + 0.5).astype('int32'))
      right = min(np.shape(image)[1], np.floor(right + 0.5).astype('int32'))

      #此处存top、left、bottom、right
      sub = []
      sub.append(float(left))
      sub.append(float(top))
      sub.append(float(right))
      sub.append(float(bottom))
      sub.append(score)
      UAV.append(sub)
      #UAV_confidence.append(score)

      # 画框框
      #label = '{} {:.2f}'.format(predicted_class, score)
      #label = '{} {:.2f}'.format("U.S.", score)
      label = '{}'.format("U.S.")
      draw = ImageDraw.Draw(image)
      label_size = draw.textsize(label, font)
      label = label.encode('utf-8')
      
      if top - label_size[1] >= 0:
          text_origin = np.array([left, top - label_size[1]])
      else:
          text_origin = np.array([left, top + 1])

      for i in range(thickness):
           #draw.rectangle(
             #[left + i, top + i, right - i, bottom - i],
               #outline=self.colors[self.class_names.index(predicted_class)])
           draw.rectangle(
               [left + i, top + i, right - i, bottom - i],
               outline=self.colors[self.class_names.index("person")])

      #draw.rectangle(
          #[tuple(text_origin), tuple(text_origin + label_size)],
          #fill=self.colors[self.class_names.index(predicted_class)])
      draw.rectangle(
          [tuple(text_origin), tuple(text_origin + label_size)],
          fill=self.colors[self.class_names.index("person")])

      draw.text(text_origin, str(label,'UTF-8'), fill=(0, 0, 0), font=font)

      del draw

  Infra_red_iou = []
  for m in range(len(Infra_red)):
      max_iou = 0
      for n in range(len(UAV)):
          # 获取box1左上角和右下角的坐标
          x1min, y1min, x1max, y1max = Infra_red[m][0],Infra_red[m][1], Infra_red[m][2], Infra_red[m][3]
          # 计算box1的面积
          s1 = (y1max - y1min + 1.) * (x1max - x1min + 1.)
          # 获取box2左上角和右下角的坐标
          x2min, y2min, x2max, y2max = UAV[n][0], UAV[n][1], UAV[n][2], UAV[n][3]
          # 计算box2的面积
          s2 = (y2max - y2min + 1.) * (x2max - x2min + 1.)
          # 计算相交矩形框的坐标
          xmin = np.maximum(x1min, x2min)
          ymin = np.maximum(y1min, y2min)
          xmax = np.minimum(x1max, x2max)
          ymax = np.minimum(y1max, y2max)
          # 计算相交矩形行的高度、宽度、面积
          inter_h = np.maximum(ymax - ymin + 1., 0.)
          inter_w = np.maximum(xmax - xmin + 1., 0.)
          intersection = inter_h * inter_w
          # 计算相并面积
          union = s1 + s2 - intersection
          # 计算交并比
          iou = intersection / union
          max_iou = max(max_iou, iou)
      Infra_red_iou.append(max_iou)
  
  num_Confusion = len(UAV)
  for m in range(len(Infra_red)):
      if Infra_red_iou[m] > 0.75:
          continue
      else:    #如果这个目标框是高空图像没有检测出来的，就画出来
          xbmin, ybmin, xbmax, ybmax = Infra_red[m][0], Infra_red[m][1], Infra_red[m][2], Infra_red[m][3]
          bscore = InfraRed_confidence[m]
          sub = []

          sub.append(float(xbmin))
          sub.append(float(ybmin))
          sub.append(float(xbmax))
          sub.append(float(ybmax))
          sub.append(float(bscore))
          #UAV_item包括4个coordinates和1个confidence
          UAV.append(sub)

          num_Confusion = num_Confusion + 1
          bu_text_origin = np.array([xbmin, ybmin + 1])
          #bu_label = '{} {:.2f}'.format("U.S.", float(bscore))
          bu_label = '{}'.format("U.S.")
          bu_label = bu_label.encode('utf-8')
          draw = ImageDraw.Draw(image)

          for p in range(thickness):
              draw.rectangle(
                  [xbmin + p, ybmin + p, xbmax + p, ybmax + p],
                  outline=self.colors[self.class_names.index(predicted_class)])
          draw.rectangle(
              [tuple(bu_text_origin), tuple(bu_text_origin + label_size)],
              fill=self.colors[self.class_names.index(predicted_class)])

          draw.text(bu_text_origin, str(bu_label, 'UTF-8'), fill=(0, 0, 0), font=font)
          del draw

  package_json = {}
  boxes_package = []
  for index in range(len(UAV)):
      boxes_item_package = {}
      boxes_item_package['classes'] = "person"
      boxes_item_package['confidence'] = str(UAV[index][4])[:9]
      boxes_item_package['coordinates'] = UAV[index][:4]
      boxes_package.append(boxes_item_package)
  package_json["boxes"] = boxes_package
  package_json["count"] = num_Confusion

  with open(Confusion_result_json, "w+") as load_f:
      final = json.dumps(package_json, ensure_ascii=False, indent=4)
      load_f.write(final)
      load_f.close()
```

前端主页如下：
![image](https://github.com/DouziChenJunyi/Multi_Fusion/blob/main/screenshot/mainPage.jpeg)
