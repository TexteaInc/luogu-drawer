# coding=UTF-8

from PIL import Image
import json
from colorsys import rgb_to_hsv

configPath = '../config.json'
dataPath = '../data/newweb.json'
imagePath = "../public/newweb.jpg"

colors = {
    (0, 0, 0): 0,
    (255, 255, 255): 1,
    (170, 170, 170): 2,
    (85, 85, 85): 3,
    (254, 211, 199): 4,
    (255, 196, 206): 5,
    (250, 172, 142): 6,
    (255, 139, 131): 7,
    (244, 67, 54): 8,
    (233, 30, 99): 9,
    (226, 102, 158): 10,
    (156, 39, 176): 11,
    (103, 58, 183): 12,
    (63, 81, 181): 13,
    (0, 70, 112): 14,
    (5, 113, 151): 15,
    (33, 150, 243): 16,
    (0, 188, 212): 17,
    (59, 229, 219): 18,
    (151, 253, 220): 19,
    (22, 115, 0): 20,
    (55, 169, 60): 21,
    (137, 230, 66): 22,
    (215, 255, 7): 23,
    (255, 246, 209): 24,
    (248, 203, 140): 25,
    (255, 235, 59): 26,
    (255, 193, 7): 27,
    (255, 152, 0): 28,
    (255, 87, 34): 29,
    (184, 63, 39): 30,
    (121, 85, 72): 31,
}


def get_color(pixel):
    return min_color_diff(pixel, colors)[1]


def to_hsv(color):
    return rgb_to_hsv(*[x / 255.0 for x in color])


def color_dist(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(to_hsv(c1), to_hsv(c2)))


def min_color_diff(color_to_match, colors):
    """ 返回字典中最小颜色差值的值"""
    return min(
        (color_dist(color_to_match, test), colors[test])
        for test in colors)


def save(data):
    data = json.dumps(data)
    with open(dataPath, 'w+') as f:
        f.write(data)
    print("完成")


def main():
    im = Image.open(imagePath)
    # im = im.resize((32, 32))
    data = []
    w, h = im.size
    print("width", w, "height", h)

    for i in range(0, w, 1):
        for j in range(0, h, 1):
            color = get_color(im.getpixel((i, j)))
            data.append([i, j, color])
    save(data)


if __name__ == '__main__':
    main()
