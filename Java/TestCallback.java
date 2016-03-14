public class TestCallback
{
	interface CallbackListener
	{
		void onCallback();
	}

	public static void main(String[] args)
	{
		int t = 0;
		TestCallback tc = new TestCallback();
		tc.Call(new CallbackListener(){
			public void onCallback(){
				System.out.println("Hello, Callback" + t);
			}
		});
	}

	public void Call(CallbackListener listener)
	{
		listener.onCallback();
	}
}