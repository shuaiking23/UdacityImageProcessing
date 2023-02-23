"# UdacityImageProcessing" 

node build

--Files Allowed--
```
encenadaport.jpg
fjord.jpg
icelandwaterfall.jpg
palmtunnel.jpg
santamonica.jpg 
```

--Features--
```
/view?filename={{filename}}
```
- Allows you to view an image from images/thumbs.

```
/resize?filename={{filename}}&height={{height}}&width={{width}}
```
- Allows you to resize an image from images and view the image saved in thumbs
- If image already exists in thumbs, skip resize and just load image from thumbs

```
/removethumb?filename={{filename}}
```
- Allows you to remove an image from thumbs.
- thumbs image format is {{name}}\_thumb\_{{height}}\_{{width}}

--Additional Notes--

Just in case I quit the terminal but left the port open.
```
netstat -ano | findstr :3000
taskkill /PID {pid}
```