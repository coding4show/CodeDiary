--使用原型的方式面向对象

Base = {}
function Base:func2()
	print("Base", self.name)
end

A = {}
setmetatable(A, A)
A.__index = Base
function A:func ()
	print("A", self.name)
end

a = {}
a.name = "linn"
setmetatable(a, a)
a.__index = A

a:func()
a:func2()

b = {}
b.name = "base"
setmetatable(b, b)
b.__index = Base

b:func2()
b:func()
