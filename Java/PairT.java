public class PairT
{
	public static void main(String[] args)
	{
		// Pair<String> t = new Pair<>();
		// t.first = "a";
		// t.second = "b";

		Pair<Integer> t = new Pair<>();
		t.first = 0;
		t.second = 1;
	}
}

class Pair<T>
{
	public T first;
	public T second;
}