#include <stdio.h>
#include <vector>

class Base{};
class Sub : public Base{};

void TestArray(Base p[])
{

}

void TestPointerArray(Base* p[])
{

}

void TestTemplate(std::vector<Base> v){

}

int main()
{
	Sub t[5];
	TestArray(t);

	Sub* p[5];
	TestPointerArray(p);

	std::vector<Sub> v;
	TestTemplate(v);

	return 0;
}