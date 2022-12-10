from fractions import Fraction
from sklearn.linear_model import LinearRegression
import numpy as np
import math
import cv2
import os
import sys
import tensorflow as tf
import core.utils as utils
import shutil
import json
from core.config import cfg
from core.yolov3 import YOLOv3, decode

counter = sys.argv[1]
timeArr = sys.argv[2]
timeArr = [int (i) for i in timeArr.split(",")]
mousePosArr = sys.argv[3]
mousedpi = sys.argv[4]
gamedpi = sys.argv[5]
mousedpi = float(mousedpi)
mousedpi = 200.00
gamedpi = float(gamedpi)

X_CENTER = 960
Y_CENTER = 540
XINDEX = 0
YINDEX = 1

mousePosArr = mousePosArr.split("/")

def makeArray(mouseTrack):
    temp = []
    arr = []
    for i in range(len(mouseTrack)):
        arr.append(int(mouseTrack[i]))
        if i % 2 != 0:
            temp.append(arr)
            arr = []
    return temp

temp1 = []
temp2 = []
for string in mousePosArr:
    mouseTrack = string.split(',')
    while '' in mouseTrack:
        mouseTrack.remove('')
    while '-' in mouseTrack:
        mouseTrack.remove('-')
    temp1.append(mouseTrack)

temp1.pop()

for string in temp1:
    string = makeArray(string)
    temp2.append(string)

mousePosArr = temp2

filepath = "./videos/video_" + counter + ".mp4"
clickpath = "./videos/clickTimes_origin_" + counter + ".txt"
imagepath = './videos/images_' + counter 
video = cv2.VideoCapture(filepath)

# counter = sys.argv[1]
# mousedpi = sys.argv[2]
# gamedpi = sys.argv[3]
# mousedpi = float(mousedpi)
# mousedpi = 200.00
# gamedpi = float(gamedpi)

# X_CENTER = 960
# Y_CENTER = 540
# XINDEX = 0
# YINDEX = 1

# filepath = "./videos/video_" + counter + ".mp4"
# clickpath = "./videos/clickTimes_origin_" + counter + ".txt"
# imagepath = './videos/images_' + counter 
# video = cv2.VideoCapture(filepath)

# f = open(clickpath, 'r')
# timeArr = f.readline()
# timeArr = [int (i) for i in timeArr.split(",")]

# with open("./videos/drags_origin_" + str(counter) + ".json", "r") as f:
#     mousePosArr = json.load(f)

# def mousePosParser(mousePosArr):
#     temp2 = []

#     for arr in mousePosArr:
#         temp1 = []
#         for string in arr:
#             if string == '/':
#                 break
#             else:
#                 temp1.append(string)
#         temp2.append(temp1)
#     return temp2

# mousePosArr = mousePosParser(mousePosArr)

def center_crop(img):
    
    h, w, c = img.shape
    set_size = 600
    if set_size > min(h, w):
        return img

    crop_width = set_size
    crop_height = set_size

    mid_x, mid_y = w//2, h//2
    offset_x, offset_y = crop_width//2, crop_height//2
       
    crop_img = img[mid_y - offset_y:mid_y + offset_y, mid_x - offset_x:mid_x + offset_x]
    return crop_img

def get_head_coord(img, bboxes):
    # bboxes: [x_min, y_min, x_max, y_max, probability, cls_id] format coordinates.
    x = int((bboxes[0][2] - bboxes[0][0]) / 2 + bboxes[0][0])
    y = int((bboxes[0][3] - bboxes[0][1]) / 2 + bboxes[0][1])
    coord = [int(1920/2 - 300 + x), int(1080/2 - 300 + y)]
    cv2.line(img, (x, y), (x, y), (0,0,255), 3)
    return img, coord

def predict(img_paths):

    INPUT_SIZE   = 416
    NUM_CLASS    = len(utils.read_class_names(cfg.YOLO.CLASSES))
    CLASSES      = utils.read_class_names(cfg.YOLO.CLASSES)

    # Build Model
    input_layer  = tf.keras.layers.Input([INPUT_SIZE, INPUT_SIZE, 3])
    feature_maps = YOLOv3(input_layer)

    bbox_tensors = []
    for i, fm in enumerate(feature_maps):   
        bbox_tensor = decode(fm, i)
        bbox_tensors.append(bbox_tensor)

    model = tf.keras.Model(input_layer, bbox_tensors)
    model.load_weights("./Final/yolov3")
    model.trainable = False
    head_coord = []
    prefix = './videos/imgs_' + counter
    os.makedirs(prefix)
    cnt = 0
    for img_path in (img_paths):
        image = cv2.imread(img_path)
        image = center_crop(image)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        # Predict Process
        image_size = image.shape[:2]
        image_data = utils.image_preporcess(np.copy(image), [INPUT_SIZE, INPUT_SIZE])
        image_data = image_data[np.newaxis, ...].astype(np.float32)
        
        pred_bbox = model.predict(image_data)
        pred_bbox = [tf.reshape(x, (-1, tf.shape(x)[-1])) for x in pred_bbox]
        pred_bbox = tf.concat(pred_bbox, axis=0)
        bboxes = utils.postprocess_boxes(pred_bbox, image_size, INPUT_SIZE, cfg.TEST.SCORE_THRESHOLD)
        bboxes = utils.nms(bboxes, cfg.TEST.IOU_THRESHOLD, method='nms')
        np_bboxes = np.array(bboxes)
        if np_bboxes.shape[0] == 1:
            image = utils.draw_bbox(image, bboxes)
            image, coord = get_head_coord(image,bboxes)
            head_coord.append(coord)
            save_path = prefix + "/" + str(cnt) + ".jpg"
            cnt += 1
            cv2.imwrite(save_path, image)
        else :
            head_coord.append([-1, -1])
        # cv2.imshow("image", image)
        # cv2.waitKey() 
    return head_coord

def predictSensitivity(xarr, yarr, target, dpi, sensitivity):
    X = np.array(xarr)
    y = np.array(yarr)
    line_fitter = LinearRegression()
    line_fitter.fit(X.reshape(-1,1), y)
    end_point = [X[X.size-1], y[y.size-1]]

    coef = Fraction(line_fitter.coef_[0])
    start_point, end_point = moveToAim(coef, X[0], end_point, dpi)

    sensitivity = round(sensitivity * distanceOfTwoPoint(target[XINDEX], target[YINDEX], start_point[XINDEX], start_point[YINDEX]) / distanceOfTwoPoint(start_point[0],start_point[1], end_point[0], end_point[1]), 2)
    return sensitivity

def distanceOfTwoPoint(x1, y1, x2, y2):
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2)**(1/2)

def radian(cx, cy, x1, y1, x2, y2):
    return math.atan((y1 - cy) / (x1 - cx)) - math.atan((y2 - cy) / (x2 - cx))

def setStartPoint(coef, firstX, end_point, dpi):
    start_point = [0, 0]
    x = dpi/((coef**2+1) ** (1/2))
    if coef > 0:
        if firstX < end_point[XINDEX]:
            start_point[XINDEX] = end_point[XINDEX] - x
            start_point[YINDEX] = end_point[YINDEX] - x*coef
        else:
            start_point[XINDEX] = end_point[XINDEX] + x
            start_point[YINDEX] = end_point[YINDEX] + x*coef
    else:
        if firstX < end_point[XINDEX]:
            start_point[XINDEX] = end_point[XINDEX] - x
            start_point[YINDEX] = end_point[YINDEX] - x*coef
        else:
            start_point[XINDEX] = end_point[XINDEX] + x
            start_point[YINDEX] = end_point[YINDEX] + x*coef

    return start_point

def moveToAim(coef, firstX, end_point, dpi):
    start_point = setStartPoint(coef, firstX, end_point, dpi)
    if(end_point[XINDEX] > X_CENTER):
        start_point[XINDEX] = start_point[XINDEX] - (end_point[XINDEX] - X_CENTER)
    else:
        start_point[XINDEX] = start_point[XINDEX] + (X_CENTER - end_point[XINDEX])

    if(end_point[YINDEX] > Y_CENTER):
        start_point[YINDEX] = start_point[YINDEX] - (end_point[YINDEX] - Y_CENTER)
    else:
        start_point[YINDEX] = start_point[YINDEX] + (Y_CENTER - end_point[YINDEX])

    end_point[XINDEX] = X_CENTER
    end_point[YINDEX] = Y_CENTER

    return start_point, end_point

def arrParser(mouseTracking):
    x = []
    y = []
    for point in mouseTracking:
        x.append(point[XINDEX])
        y.append(point[YINDEX])

    return x, y

if not video.isOpened():
    print("Could not Open: ", filepath)
    exit(0)

length = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = video.get(cv2.CAP_PROP_FPS)

validTimeIndex = []

try:
    if not os.path.exists(imagepath):
        os.makedirs(imagepath)
except OSError:
    print ('Error: Creating directory. ' +  imagepath)

count = 0

while(video.isOpened()):
    ret, image = video.read()
    if ret:
        for i in timeArr:
            i -= 20
            v = int(video.get(cv2.CAP_PROP_POS_MSEC))
            if v - fps/2 < i and v + fps/2 > i:
                cv2.imwrite(imagepath + "/frame%d.jpg" % count, image)
                count += 1
                i = i + 20
                validTimeIndex.append(timeArr.index(i))
    else:
        break
video.release()

imgfilepath = []

for i in range(len(validTimeIndex)):
    imgfilepath.append(imagepath + "/frame%d.jpg" % i)
    
dpis = []

target = predict(imgfilepath)

imgIndex = []
for i in range(len(target)):
    imgIndex.append(i)

for i in range(len(mousePosArr)):
    flag = False
    if i in validTimeIndex:
        index = validTimeIndex.index(i)
        targetPoint = target[index]
        x, y = arrParser(mousePosArr[i])
        if targetPoint[0] == -1:
            imgIndex.remove(index)
            continue

        for p, q in zip(x,y):
            if p <= 10 or q <= 10:
                imgIndex.remove(index)
                flag = True
                break
        if flag :
            continue
        print("index : " + str(index))
        print(mousePosArr[i])
        print("target X : " + str(targetPoint[0]))
        print("target Y : " + str(targetPoint[1]))
        newSensitivity = predictSensitivity(x, y, targetPoint, mousedpi, gamedpi)
        print("new dpi : " + str(newSensitivity))
        dpis.append(newSensitivity)

# if os.path.exists(imagepath):
#     shutil.rmtree(imagepath)
# if os.path.exists(filepath):
#     os.remove(filepath)

if len(dpis) == 0 :
    print(0)
    print(gamedpi)
else :
    avg = sum(dpis) / len(dpis)
    avg = round(avg, 2)
    print("frame image index :")
    print(imgIndex)
    print(len(dpis))
    print(avg)
exit(0)