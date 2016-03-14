export JDK=/System/Library/Frameworks/JavaVM.framework/Versions/A
gcc -dynamiclib -I $JDK/Headers -shared -o libHelloNative.jnilib HelloNative.c
javac HelloNative.java
javac HelloNativeTest.java
java -Djava.library.path=. HelloNativeTest
