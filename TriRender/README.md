#图形相关实验

##0.TSRender
使用TypeScript调用WebGL，模仿Unity的API实现简单的游戏渲染引擎。

目前接近完成的核心类有
* Vector2/Vector3
* Matrix4x4
* Transform
* Camera
* Mesh
* Mateirial

Vector和Matrix是纯数学类；  
Material负责载入编译shader，持有shader的导出变量(attribute, uniform)；  
Transform负责建立场景树；  
Camera负责相机相关；  

未来打算添加Render类，来统一管理一次DrawCall中用到的对象，并且持有中间变量