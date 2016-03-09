public class TestCallback
{
	interface CallbackListener
	{
		void onCallback();
	}

	public static void main(String[] args)
	{
		TestCallback tc = new TestCallback();
		tc.Call(new CallbackListener(){
			public void onCallback(){
				System.out.println("Hello, Callback");
			}
		});
	}

	public void Call(CallbackListener listener)
	{
		listener.onCallback();
	}
}