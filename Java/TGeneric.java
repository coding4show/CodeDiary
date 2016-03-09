import java.util.*;

public class TGeneric
{
	public static void main(String[] args)
	{
		TGeneric t = new TGeneric();
		t.testGeneric(new ArrayList<Sub>());
		t.testArray(new Sub[100]);
	}

	public void testGeneric(ArrayList<? extends Base> t)
	{

	}

	public void testArray(Base[] t)
	{

	}
}

class Base{

}

class Sub extends Base{

}