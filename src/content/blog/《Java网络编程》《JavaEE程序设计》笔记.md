---
title: 《Java网络编程》《JavaEE程序设计》笔记
slug: note-java
publishedDate: 2021-12-30 14:23:23
tags: [Java]
category: CUMT课程笔记
---

# Java语言基础

## 数据类型

* 标识符规则
  * 由字母、 数字、下划线、 $组成。不能由数字开头。
  * 不能含有其他任何字符（包括空格）
  * 不能是Java中的保留字(关键字)。
  * 大小写敏感，长度无限制。
  
* 变量类型

  * 8种基本数据类型（byte1, short2, int4, long8, float4, double8, char2, boolean）
  * 构造数据类型（类）

* 常量类型

  * 数值常量
  * 符号常量：`final int a = 10;`，值一旦确定不可更改，类静态成员常量只能在定义时初始化
  * 注意事项
    * 一个整型常量在机器中默认以int类型存储
    * 一个实型常量在机器中默认以double类型存储
    * 十进制表示法小数点的两侧都必须有数字
    * 科学表示法尾数必须有，但小数部分可无，阶码必须是整数
    * 不可将布尔类型看做整型值。


## 运算符及表达式

* 自增自减

  * 只能用于变量，而不能用于常量或表达式
  * `a = 5; a--+10; `表达式的值为15，a变为4

* 除法

  * 整数相除，截尾法取整
  * 浮点数相除，是通常意义的除法

* 除余

  ```java
  5%2=1
  5.2%2=1.2
  5.2%2.2=0.8 
  10%-4=2
  -10%-4=-2 
  ```

* 如果整数相除或取模，第二个操作数为0，编译无错，运行会出错。如果浮点数相除，第二个操作数为0，结果为Infinity，0.0/0除外是NaN。如果浮点数取模，第二个操作数为0，结果为NaN

* 字符串连接

  ```java
  //A的ASCII码是65，a的ASCII码是97(65+32)
  'a'+1        //98
  'A'+2+2.5    //69.5
  ""+'a'+1     //a1
  "abc"+1+2.3  //abc12.2
  1+2.3+"abc"  //3.3abc
  1+"abc" +2.3 //1abc2.3
  ```

* 对象运算符用来确定一对象是否是某一指定类的对象

  ```java
  Test t1 = new Test();
  if(t1 instanceof Test) System.out.println("Yes");
  ```

* 逻辑运算符，&和|没有短路逻辑，&&和||有

* 移位之前先把移的位数与被移位的位数求余数，然后移动这个位数

* 优先级

| 优先级 |          运算符           |    类型    |
| :----: | :-----------------------: | :--------: |
|   1    |           ()            |            |
|   2    |   +、-  、++、--、 !、~   | 单目运算符 |
|   3    |          *、/、%          | 算术运算符 |
|   4    |           +、-            | 算术运算符 |
|   5    |       <<、>>  、>>>       | 移位运算符 |
|   6    |       <、<=、>、>=        | 关系运算符 |
|   7    |          ==、!=           | 关系运算符 |
|   8    |            &&             | 逻辑运算符 |
|   9    | &#124;&#124; | 逻辑运算符 |
|   10   |            ?:             | 条件运算符 |
|   11   | =、+=、-=、*=、/=、%=、^= | 赋值运算符 |
|   12   |  &=、&#124;=、<<=、>>=、>>>=  | 赋值运算符 |

* 一个实型常量在机器中默认以double类型存储。实型常量后加后缀F或f在机器中以float类型存储。

* 数据类型转换

  * 自动转换，自动把精度较低的类型转换为另一种精度较高的类型，如果byte、short、char在一起运算时，会先将这些值转换为int型。再进行运算，结果为int型。

  * 手动强制转换

    * 强制类型转换可能造成信息的丢失
    * 布尔型与其它基本类型之间不能转换

    ```java
    int i; byte b,c;
    b=(byte)345;      //上机测试知b得到89(345%256)  
    c=(byte)356;      //上机测试知c得到100(356%256)
    i=(int)(3.8+6);   //截尾法
    ```

    * TIPS
      * **在运算过程中，运算的结果至少是int型**，即如果参与运算的两个数级别比int型低或是int型，则结果为int型
      * 参与运算的数据如果有一个级别比int型高，则运算结果的类型与类型级别高的数相同
      * 参与运算的两个数据如果类型不一样，会先把低级的数据转换成高级的类型的数据后再作运算，结果是高级的类型

  * 隐含强制转换

    * 把int类型的常量赋给byte、short变量时不需要强制类型转换
    * 把int类型的变量赋给byte、short类型的变量时必须强制转换，否则会出错

    ```java
    float x=3.3f;
    double y=2.9;
    byte a=5;
    x+(int)y/3*a;    //float
    ```

## 语句

* 标准输入输出

  * `System.out`

    ```java
    System.out.println();
    System.out.print();
    ```

    * ``System.in``读一个字节，**需要捕获异常**`IOException`
    * `int read()`从流中读取一个字节并将该字节作为整数返回,若没有数据则返回-1 
    * `int read(byte b[])` 从流中读取多个字节放到b中, 返回实际读取到的字节数 
    * `int read(byte b[],int off,int len)` 从流中读取最多len字节的数据, 放到数组b的下标off开始的单元中，返回读取到的字节数
  
    ```java
    //ReadChar.java 
    import java.io.*;
    public class ReadChar {
       public static void main(String args[]) {
    		try {
    			char ch=(char)System.in.read();
                System.out.println(ch);    
            } catch(IOException e) {
    			e.printStackTrace();
    		}
       } 
    }
    
    //ReadString.java
    import java.io.*;    
    public class ReadString {
        public static void main(String args[]) {
            char c;
            try {
                do {
                    c = (char)System.in.read();
                    System.out.print(c);
                } while(c!='\n');
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    //ReadStringOrInt.java 
    import java.io.*;
    class ReadStringOrInt {
    	public static void main(String args[]) {
    		byte buf[]=new byte[20];  
    		String str;
            int anInt;         
    	    try {    
    			System.in.read(buf);  
    			str=new String(buf);
    			anInt=Integer
                    .parseInt(str.trim()); 
                //trim必须
            } catch(Exception e) {
                e.printStackTrace(); 
    		} 	
    	}
    }
    ```
  
* `Scanner`

  ```
  Scanner sc = new Scanner(System.in);
  i = sc.nextInt();
  i = sc.next();
  ```
  
* 选择、循环、跳转等语句没啥说的跟其他语言差不多

  * `for`
  
  ```java
  //一种特殊的for循环
  int[] scores = {89, 72, 64, 58, 93};
  for ( int sco: scores ) {
      System.out.println(sco);
  }
  ```
  
  * `switch`
  
    注意`break`

## 数组

* 声明\创建数组空间\初始化

  ```java
  int[] list1; list1 = new int[3];
  int[] list2 = new int[3];
  int[] a = {1,2,3,4};
  int[] b = new int[3]; b[0]=8; b[1]=9;
  int[] c; c = new int[]{1, 2, 3, 4};
  int[] d = new int[]{1, 2, 3, 4};
  //WRONG
  //int[] a; a = {1,2,3,4}; 
  //int a[5]; 
  
  int[][] a; a = new int[2][3];
  int[][] b; b = new int[2][];
  int[][] c = new int[2][3];
  int[][] d ={{2,3},{1,5},{3,4}};
  int[][] e = new int[][]{{2,3},{1,5},{3,4}};
  
  int[][] f = new int[2][];
  f[0]=new int[3];
  f[1]=new int[5]; //不规则数组
  ```

  ps: 如果括号写在后面会提示是C样式的定义，建议统一写在前面，但是写在前面还是写在后面都是没有影响的

# 面向对象程序设计

## 类的定义

```java
//类首说明
[修饰符] class 类名 [extends] [implements]
{
    //类体
	[成员变量说明]
	[构造方法说明]
	[静态初始化说明]
	[成员方法说明]
}；
```

## 类首说明

* 修饰符
  * 访问权限修饰符`缺省/public`
  * 抽象类`abstract`
  * 最终类`final`
* `extends`Java中一个类最多能继承一个类（单继承）
* `implements`接口名可以有多个

## 成员变量

* 访问权限修饰符`public>protected>缺省>private`

|    修饰符    | 同一个类 | 不同包的子类 | 同一个包中 | 不同包中的非子类 |
| :----------: | :------: | :----------: | :--------: | :--------------: |
| 缺省friendly |    √     |      ×       |     √      |        ×         |
|    public    |    √     |      √       |     √      |        √         |
|  protected   |    √     |      √       |     √      |        ×         |
|   private    |    √     |      ×       |     ×      |        ×         |

tips

* 具有继承关系的子类可以继承父类的一些成员变量，即可以**不创建对象**就可以直接访问。如果是同一个包的子类可以继承到缺省/public/protected修饰的变量，如果是不同的包的子类就只能继承到public/protected的；
* 如果是其他类，不管是一个包还是不在一个包，都要创建该类的对象才能引用
* 如果是main方法，不管是本类还是非本类，要访问实例变量都要创建对象，可以引申到其他所有的类方法中
* 私有成员只能在本类中访问，如果在main方法中访问私有成员，必须创建对象
* 如果是创建对象，不同包的子类中定义的父类的对象只能调用public，不同包的子类中定义的子类的对象可以调用public、protected

* `static`

  static修饰的成员变量称为类变量（静态变量）；不用static修饰的成员变量又叫对象变量（实例变量）。可以通过类来访问静态成员变量，也可以通过该类的对象访问静态成员变量。

* `final`

  无论是实例变量，还是类变量，都可以被说明成常量。final修饰符和static修饰符并不冲突

  * 类常量，一定要在定义时就给定初始值，声明赋值不分开
  * 对象常量，一个final成员变量，没有static修饰，不同的对象可以有不同的值。一定要给初始值，但可有两种方法：（1）在定义变量时赋初始值（声明赋值可分开）（2）在每一个构造函数中进行赋值

* `transient`和`volatile `

* 成员变量的使用
  * 类内部：只用变量名即可访问（类内的静态方法例如main访问对象变量例外）
  * 类外部：对象变量要构造对象、类变量2种都行（static）

## 成员方法

* 成员方法首部声明

  `[方法修饰] 返回类型 方法名（[形参]）[throws异常]`

  * 访问修饰符： 缺省/public/protected/private
  * 非访问修饰符：static/abstract/final/native/synchronized

* 成员方法调用
  * 内部调用：直接
  * 外部调用：类方法（static）、对象方法
    * 在类方法中不能直接引用对象变量。在**类方法（static）中不能使用super、this关键字**。类方法不能直接调用类中的对象方法。
    * 对象方法可以引用对象变量，也可以引用类变量。对象方法中可以使用supper、this关键字。对象方法中可以调用类方法。
* 方法的重载
  * 或者参数个数不同，或者参数类型不同，或者参数类型顺序不同

## 构造方法、对象创建

* 对象成员变量初始化

  1. 自动初始化
  2. 通过一个成员方法显示地初始化为其他值
  3. 定义构造方法时初始化

* 构造方法

  ` [修饰符] 方法名（[形参]）[throws异常] {方法体}`

  * 编译器内部机理
    1. 为对象分配内存空间(堆)；
    2. 按缺省值初始化对象中的实例变量的值；
    3. 调用对象的构造方法(可以在构造方法中初始化其他的值)。
  * 构造方法重载

* 对象创建

  * 对象的声名
  * 对象的实例化
  * 对象的初始化

  ps：对象是引用型变量，new以类为模板，开辟空间并执行相应的构造方法，完成对象的实例化和初始化，并返回该对象的一个引用（即该对象所在的内存首地址)

* 对象的成员变量及方法的访问

* this

  * 在方法及构造方法中，可以使用this来访问对象的属性和方法。构造方法中，用this调用另一构造方法。
  * 通过this不仅可以引用该类中定义的变量和方法，还可以引用该类的父类中定义的成员变量和方法。
  * 在所有的非static方法中，都隐含了一个参数this。**而static方法中，不能使用this。**

## 继承

`class 新的子类名 extends 继承的父类名(必须有且只能一个)`

* Object类是Java中所有类的直接父类或间接父类。 

* 子类特性：子类拥有其父类的**所有**属性和方法。但父类中说明为private的属性和方法，子类不可直接访问。子类可以对父类的方法覆盖或重载。

* 属性的继承、隐藏和添加

  * 子类可以继承父类的所有属性（只要该属性没有private修饰）
  * 子类重新定义一个与父类那里继承来的成员变量完全相同的变量，就称作属性的隐藏。
  * 在定义子类时，加上的新的属性变量，就可以使子类比父类多一些属性

* 方法的继承、覆盖、重载和添加

  * 父类的非私有方法也可以被子类自动继承

  * 覆盖：在子类中定义的方法和父类中的方法的首部是一样的，包括方法名、参数列表、返回类型和异常抛出。但方法体的实现改变了。

    ps：覆盖的方法的首部必须要和被覆盖的方法的首部完全匹配、返回值类型一致，才能达到覆盖的效果。覆盖的方法所抛出的异常必须和被覆盖方法的所抛出的异常一致，或者是其子类；被覆盖的方法不能为private，否则在其子类中只是新定义了一个方法，并没有对其进行覆盖。

  * 重载：方法名相同，但参数列表不同（实际是相当于在子类中新加了一个方法）

    ps：在使用重载时只能通过不同的参数表样式。不能通过访问权限、返回类型、抛出的异常进行重载。被重载的方法不能为private，否则在其子类中只是新定义了一个方法。

  * 添加

  * ps：在继承机制中，不允许在子类中降低成员(包括变量和方法)的访问权限（访问权限大小关系是private<缺省<protected<public）。即如果一个方法在父类中是protected的，那么在子类中要重载或覆盖该方法时，就不能把该方法改成是缺省或private，否则会出现编译错误。

* **向上转型和向下转型**

  * 向上转型

    * 用父类的引用变量去引用子类的实例，这是允许的。当向上转型之后，父类引用变量可以访问子类中属于父类的属性和方法，但是不能访问子类独有的属性和方法。

    * 向上转型，在运行时，会遗忘子类对象中与父类对象中不同的方法。也会覆盖与父类中相同的方法（重写）。

    * **向上转型之后的方法调用问题**

      ```java
      class A {
          public String Show(D obj) { return ("(A-D)"); }
          public String Show(A obj) { return ("(A-A)"); }
      }
      class B extends A {
          public String Show(B obj) { return ("(B-B)"); }
          public String Show(A obj) { return ("(B-A)"); }
      }
      class C extends B {
          public String Show(B obj) { return ("(C-B)"); }
      }
      class D extends B {
          public String Show(D obj) { return ("(D-D)"); }
          public String Show(B obj) { return ("(D-B)"); }
      }
      
      public class mainTest {
          public static void main(String args[]){
             A a1 = new A();
             A a2 = new B();
             B b = new B();
             C c = new C();
             D d = new D();
             System.out.println(a1.Show(b)); //(A-A)
             System.out.println(a1.Show(c)); //(A-A)
             System.out.println(a1.Show(d)); //(A-D)
             System.out.println(a2.Show(b)); //(B-A)
             System.out.println(a2.Show(c)); //(B-A)
             System.out.println(a2.Show(d)); //(A-D)
             System.out.println(b.Show(b));  //(B-B)
             System.out.println(b.Show(c));  //(B-B)
             System.out.println(b.Show(d));  //(A-D)
          }
      }
      
      //先改写类方法，再直接判断
      ```

      

  * 向下转型
    * 并不是所有的对象都可以向下转型，**只有当这个对象原本就是子类对象通过向上转型得到的时候才能够成功转型**

* super

  * 使用情况：子类隐藏了超类中的变量或方法，而在程序中又要使用超类中被隐藏的变量或方法时使用。或者在子类的构造方法中引用超类的构造方法时使用。

  * **构造方法是不能继承的**，因为继承意味着与父类的构造方法同名，但显然子类的构造方法不可能与父类的构造方法同名。但是子类的构造方法一定会调用父类的构造方法，以此类推，将继承阶层串联起来，使每个父类的构造方法皆被调用。（构造方法不能继承并不意味着子类不能调用父类的构造方法，且可以显式调用，放在第一句）

  * 注意事项
    * 通过super不仅可以访问直接父类中定义的属性和方法，还可以访问间接父类中定义的属性和方法。
    * 由于它指的是父类对象，所以super不能在static环境中使用，包括类变量、类方法和static语句块。
    * 使用super不能访问本类定义的属性和方法
    * 在构造方法中使用super时，super语句必须放在第一句 
    * 在子类的构造方法中，super可以不明确使用，也可以明确使用。
    * 建议：在写多个继承关系的类时，尽量在子类的构造方法中明确使用super调用父类的构造方法，**继承默认调用super（）**
    
  * 构造方法的调用顺序
    * 首先调用父类的构造方法。这个步骤会反复递归，使继承阶层的**根源最先**被构建，然后是次一层的子类，直至最末一层子类为止；
    * 根据各个成员的**声明顺序**，执行成员变量的初始化赋值；
    * 执行该构造方法中的各语句。
    
    ```java
    class Base {
        private String name = "base";
        public Base() {
            System.out.println("Base(): " + name);
            tellName();
        }
        public void tellName() {
            System.out.println("Base tell name: " + name);
        }
    }
    public class Derived extends Base {
        private String name = "derived";
        public Derived() {
            System.out.println("Derived():"+ name);
            tellName();
        }
        public void tellName() {
            System.out.println("Derived tell name: " + name);
        }
        public static void main(String[] args){
            new Derived();
        }
    }
    
    /*输出
    Base(): base
    Derived tell name: null
    Derived():derived
    Derived tell name: derived
    */
    ```

* 父类对象与子类对象的转换

  * 原则
    * 子类对象转为父类对象时，可以是显示的或隐式的，子类对象直接向父类对象赋值；
    * 父类对象不能被任意的转换成某一子类的对象，只有父类对象指向的实际是一个子类对象，那么这个父类对象可以转换成子类对象，但此时必须用强制类型转换。
    * 如果一个方法的形式参数定义的是父类对象，那么调用这个方法时，可以使用子类对象作为实际参数。

* **抽象类与抽象方法**

  * 抽象类不能创建任何对象，抽象类必须产生其子类，由子类创建对象。
  * 抽象类中可以包含抽象方法，也可以不包含抽象方法，但如果类中的某一方法是抽象的，整个类就必须被说明成抽象的。 
  * 抽象方法在子类中必须被实现，否则子类仍是抽象的。
  * 抽象类不是可有可无的

* final类和final方法

  * 如果一个类被final修饰符所修饰和限定，说明这个类不能被继承，即不可能有子类，就不能重载或覆盖它的任何方法
  * 所有已被private修饰符限定为私有的方法，以及所有包含在final类中的方法，都被默认为是final的。因为这些方法不可能被子类所继承，所以不可能被重载，自然都是最终的方法。

## 接口

`[修饰符] interface 接口名 [extends] [接口列表] {接口体}`

* 接口定义了一些没有实现的方法和静态常量集，使程序设计和实现相互分离，同时弥补Java只支持单重继承的不足，也可以约束实现接口的类。

* Java接口反映了对象较高层次的抽象，为描述相互似乎没有关系的对象的共性提供了一种有效的手段。 

* 和类的区别
  * 类只能单继承，而接口可以多继承。
  * 类中的方法可以是具体的，也可以抽象的。 接口中的方法都是抽象的。
  * 接口中的方法要用类来实现，一个类可以实现多个接口。
  
* **和抽象类的区别**
  
  * 接口要被子类实现，抽象类要被子类继承
  * 接口中变量全为公共静态常量，抽象类中可以有普通变量
  * 接口中都是方法的声明，抽象类中可以有方法的实现
  * 接口不可以有构造函数，抽象类可以有
  * 接口可以多实现，抽象类必须单继承
  * 接口方法都是抽象方法，抽象类可以有非抽象方法
  * 接口优先于抽象类
  
* 首部修饰符：不使用修饰符（同包访问），或者public（任意访问）

* 接口体：接口的成员：成员变量和方法
  * 成员变量：隐含public、static、final的静态最终变量（常量）
  * 方法：隐含public和abstract的抽象方法（不能使用static、native、synchronized、final）
  
* 对接口的引用

* 使用接口实现多重继承

* 多态性建立的基础
  * 继承
  * 向上转型
  * 动态绑定：能在运行期间判断参数的实际类型，并分别调用适当的方法体，从而实现了多态性。在Java中所有非final和非static的方法都会自动地进行动态绑定。
  
* 简单工厂模式（静态工厂方法模式）
  * 角色：工厂角色（能根据业务动态选择生产哪些产品）、抽象产品角色（产品有哪些特点，能做什么）、具体产品角色（产品怎么做）
  * **简单工厂乐器类**
  
  ```java
  interface Playable { public void play();}
  
  class Wind implements Playable{
      public void play(){System.out.println("管乐器~~吹");}
  }
  class Percussion implements Playable {
      public void play(){System.out.println("打击乐器~~打");}
  }
  class Stringed implements Playable{
      public void play(){System.out.println("弦乐器~~弹");}
  }
  
  class InstrumentFactory {
      public static Playable createInstrument(String insName) {
          if ("wind".equals(insName)) {
              return new Wind();
          } else if ("percussion".equals(insName)){
              return new Percussion();
          } else if ("stringed".equals(insName)) {
              return new Stringed();
          } else return null;
      }
  }
  
  public class SimpleFactoryMain {
      public static void main(String[] args) {
          Playable aWind = InstrumentFactory.createInstrument("wind");
          Playable aPercussion = InstrumentFactory.createInstrument("percussion");
          Playable aStringed = InstrumentFactory.createInstrument("stringed");
          if (aWind != null) aWind.play();
          if (aPercussion != null) aPercussion.play();
          if (aStringed != null) aStringed.play();
      }
  }
  ```

## 包

* 作用

  * 包能够让程序员将类组织成单元，通过文件夹或目录来组织文件和应用程序；
  * 包减少了名称冲突带来的问题，可以防止同名的类发生冲突；
  * 包能够更大面积的保护类、变量和方法，而不是分别对每个类进行保护；
  * 包可以用于标示类。

* 创建：说明语句必须放在整个.java文件的第一行。可以在不同的文件中使用相同的包说明语句，这样就可以将不同文件中的类都包含到相同的程序包中。

* 包的引用

  * 使用全名引用

    * 同包的类相互引用时：在使用的属性或方法名前加上类名作为前缀即可
    * 不同包中的类相互引用时：在类名的前面再加上包名，类的全名

  * 使用import

    import可以加载整个包中的文件或包中的某一个文件。

## Java变量及其传递 

* 成员变量与局部变量区别

  * 从语法形式上看：成员变量是属于类或接口的，而局部变量是在方法中定义的变量或方法的参变量；成员变量可以被public，private，static等修饰，而局部变量则不能被访问控制符及static修饰；成员变量及局部变量都可以被final修饰。
  * 从变量在内存中的存储方式看：成员变量是对象的一部分，而对象是存在于堆中的，而局部变量是存在于栈中的。
  * 从变量在内存中的存在时间上看：成员变量是对象的一部分，它随着对象的创建而存在，而局部变量随着方法的调用而产生，随着方法调用结束而自动消失。
  * 成员变量如果没有赋初值，则会自动以该类型的默认值（0,false,null等）赋值；而局部变量则不会自动赋值，必须显示地赋值后才能使用。 

* 变量的传递

  * Java中方法参数传递方式是按值传递。如果参数是基本类型，传递的是基本类型的字面量值的拷贝。如果参数是引用类型，传递的是该参量所引用的对象在堆中地址值的拷贝。

  * [其他知乎解答](https://www.zhihu.com/question/31203609)

  * 对于基本类型的变量形参修改了并不能反映到函数外面的实参
  * 对于引用类型的变量，在形参中修改了对象实体值可以反映到实参，在形参中修改了对象引用值，不能反映到实参
  * String和StringBuffer的其他区别：
    1. StirngBuffer是可以变话的，如果改变了StringBuffer变量的长度或内容，不会改变对这个对象的引用。
    2. String是固定的，如果改变了String变量的长度或内容，就会新建一个String对象，原来的String变量会指向新的String对象。

* 引用型变量的比较

  * 问题引入：`==`和`!=`用来比较引用型变量时,只能判断运算符两边引用的是不是同一个对象,即对象的地址值（或对象引用值）是不是相同，需要用`equals()`方法比较两个对象的内容(对象实体值)是否相同。

  * ps：Java为节省内存空间、提高运行效率，编译时将String Pool中所有相同的字符串合并，只占用一个空间。导致引用变量a和b指向同一个对象。

    ```java
    String a=new String("hello");
    String b=new String("hello");
    System.out.println(a==b);        //false
    System.out.println(a.equals(b)); //true
    String c="hello";
    String d="hello";
    System.out.println(c==d);        //true
    System.out.println(c.equals(d)); //true
    ```

  * 自己定义的类如果要支持equals方法必须重写从Object类继承来的equals方法

    ```java
    //Object类中的equals方法
    public boolean equals(Object obj) {
    	return (this==obj);
    }
    ```

## 内部类

* 内部类不能与外部类同名（否则，编译器无法区分内部类与外部类），如果内部类还有内部类，内部类的内部类不能与它的任何一层外部类同名。 
* 创建
  * 创建非静态内部类的对象时一定要确保已经有一个外部类对象
    * 利用外部类的方法创建并返回，因为方法是由外部类对象调用的，那创建该内部类对象时，一定已经拥有了所属的外部类对象了
    * 创建内部类还可以在除外部类中的其它类中，但是要确保该类具有访问内部类的权限，并且已经创建了一个外部类对象。
  * 内部类的修饰符
  * 静态内部类
    * 实例化static内部类时，在new前面不需要用对象变量
    * static内部类中不能访问其外部类的非static属性及方法，即只能访问static成员
    * 方法中的内部类，可以访问其外部类的成员；若是static方法中的内部类，可以访问外部类的static成员。
    * 方法中的内部类，不能访问该方法的局部变量，除非是final的局部变量。
* 使用
  * 内部类中访问外部类的成员
    * 内部类中是可以直接访问外部类的其他属性与方法的，即使它们是private的。
    * 如果内部类中有与外部类同名的属性与方法，可以使用`outerClass.this.x`或`this.x`的格式来表达外部类的引用，从而区分外部类和内部类的同名的属性与方法。
  * 方法和作用域中的内部类
* 匿名内部类
  * 这种类不取名字，而直接用其父类的名字或者它所实现的接口的名字
  * 类的定义与创建该类的一个对象同时进行，即类的定义前面有一个new，没有类的首部，对象的创建和类体共同构成一个匿名类表达式，后面以“;”结束；
  * 类中不能定义构造方法，因为它没有名字。

# 异常处理

## 概念

* Java把程序运行过程中可能遇到的问题分为两类，一类是致命性的，即程序遇到了非常严重的不正常状态，不能简单地恢复执行，这就是错误(对应Error类)，如程序运行过程中内存耗尽。另一类是非致命性的，通过某种处理后程序还能继续运行，这就是异常(对应Exception类)。
* 按异常在编译时是否被检测来分，Exception类子类有两种：运行时异常和非运行时异常（一般异常）
  * 运行时异常：RuntimeException类及其所有子类。运行时异常是程序员编写程序不正确所导致的异常，理论上，程序员经过检查和测试可以查出这类错误。如除数为零等，错误的强制类型转换、数组越界访问、空引用。
  * 非运行时异常（一般异常）：指可以由编译器在编译时检测到的、可能会发生在方法执行过程中的异常，如找不到指定的文件等，这不是程序本身的错误，如果这些异常情况没有发生，程序本身仍然是完好的
* 处理异常的三种方法
  * 用户可以用try-catch-finally语句进行捕获和处理
  * 如果不想捕获和处理异常，可以通过throws语句声明要抛出的异常
  * 用户可以定义自己的异常类,并用throw语句来抛出。

## try-catch-finally

```java
//访问文本文件text.txt，并将其在屏幕上打印出来。
import java.io.*;
class TryCatchFinally {
    public static void main(String args[]) {
        try {
            FileInputStream in = 
                new FileInputStream("text.txt");
            int s;
            while((s=in.read())!=-1) 
                System.out.print(s);
            in.close();
        } catch(FileNotFoundException e) {
            System.out.println("捕获异常："+e);
        } catch(IOException e) {
			System.out.println("捕获异常："+e);
        } finally {
			System.out.println("finally块总是执行！");
        }
    }
}
```

* 当产生的异常找到了第一个与之相匹配的参数时，就执行包含这一参数的catch语句中的Java代码，执行完catch语句后，程序恢复执行，但不会回到异常发生处继续执行，而是执行try-catch结构后面的代码。
* 可以用一个catch块来处理多个异常类型，此时catch的参数应该是这多个异常的父类。
* 有多个catch块时，要细心安排catch块的顺序。将子类的catch块放在前面，父类的catch块放在后面。
* 执行过程
  * try块中的语句没有产生异常。在这种情况下，Java首先执行try块中的所有的语句，然后执行finally子句中的代码，最后执行try…catch..finally块后面的语句；
  * try块中的语句产生了异常，而且此异常在方法内被捕获。在这种情况下，Java首先执行try块中的语句，直到产生异常处，然后跳过此try块中剩下的语句，执行捕获此异常的catch子句的处理代码；然后执行finally子句中的代码
  * 如果在catch子句又重新抛出了异常。也会执行finally，然后将这个异常抛出给方法的调用者；
  * try块中产生了异常，而此异常在方法内没有被捕获。在这种情况下，Java将执行try块中的代码直到产生异常，然后跳过try块中的代码而转去执行finally子句中的代码，最后将异常抛出给方法的调用者。

## throws抛出异常

不捕获异常，而是将异常交由上一层处理，在其他地方捕获异常。如果使用后者，那么应该（在某些情况下）向编译器表明：此方法可能会抛出异常，但方法本身不会捕获它。可以在方法头中用`throws`子句来实现此功能。

```java
// 1.调用的方法抛出了异常 
class Test {
    ……
	public String getInput() throws IOException {
		……
    	System.in.read();
	}
}

// 2.检测到了错误并使用throw语句抛出异常
import java.io.*;
class Test {
    ……
	public String getInput() throws IOException {
		……
		IOException ae = 
            new IOException("buffer is full");
		throw ae; 
	}
}
```

## throw抛出异常

* 一般这种抛出异常的语句应该在满足一定条件执行，例如把throw语句if分支中
* 含有`throw`语句的方法，应该在方法头定义中用`throws`语句声明所有可能抛出的异常
* 抛出异常三步：确定异常类；创建异常类的实例；抛出异常。

# 类库

## java.lang

* `String`

  * 可创建一个对象，用于代表一个字符串(不变的字符串)，并定义了类似查找，比较和连接字符的操作。所有字符串常量都是String对象，存储在String Pool（字符串池）中，字符串池是常量池的一部分。

  * String类对象一旦创建，其内容不可更改。String类的所有方法都不会改变String类对象内容，要改变String类对象的值就必须创建一个新的String对象。
  * String是类，在比较字符串内容时，不能用==，而应该用`equals`方法。String类覆盖了Object类的equals方法

  ```java
  //求字串，前闭后开
  String a="hello";
  String b=a.substring(0,4); // 得到hell
  
  //长度
  String c="hello你好";
  int d=c.length();          // 得到7
  
  //得到字符串中指定下标的字符。
  String a=”hello”; char b;
  b=a.charAt(0);             // 得到下标为0的字符h
  
  //字符数组转换为String
  char[] a={'a','b','c','d'};
  String b=new String(a);
  
  //String转换为字符数组
  String a="hello";
  char[] b=a.toCharArray();
  
  //字节数组转换为String
  byte[] a={65,66,67,68};
  String b=new String(a);    // 得到ABCD
  
  //大小写转换
  String s1="Hello";
  String s2=s1.toUpperCase(); // 得到HELLO
  String s3=s1.toLowerCase(); // 得到hello
  
  //其他数据类型to字符串
  String out2 = String.valueOf(100);
  String out3 = ""+100;
  String out1 = new Integer(100).toString();
  ```

* `StringBuffer`

  ```java
  //三种创建方法
  public StringBuffer()；
  public StringBuffer(int length)；
  public StringBuffer(String str)；
  
  //更新
  StringBuffer s=new StringBuffer("hello");
  s.append("java");   // s变为hellojava
  s.insert(5,"sun");  // s变为hellosunjava
  s.setCharAt(0,'H'); // s变为Hellosunjava
  s.delete(5,8);      // s变为Hellojava
  
  //StringBuffer对象和String对象的转换
  StringBuffer s = new StringBuffer("hello");
  String a = s.toString();
  ```

* 数据类型类

  ```java
  //将字符串转换为int型 
  String s = "1234";
  int i = Integer.parseInt(s);
  int i = Integer.parseInt(s,16); //16进制
  
  
  //将int型转换为字符串
  int i = 1234;
  String s = Integer.toString(i);
  ```

* `Math`

  ```java
  //PI
  double x = Math.PI
      
  //接受一个double类型的弧度值,返回类型均为double
  sin(double a) //返回弧度a的sin值
  cos(double a) //返回弧度a的cos值
  tan(double a) //返回弧度a的tan值
      
  //反三角函数，返回类型均为double型。
  asin(double r) //返回sin值为r的弧度
  acos(double r) //返回cos值为r的弧度
  atan(double r) //返回tan值为r的弧度
  
  //返回类型均为double型
  pow(double x, double y) //返回x^y。
  exp(double x)           //返回e^x
  log(double x)           //返回log_e(x)。
  sqrt(double x)          //返回x的平方根。
  
  //取整
  ceil(double a)  //返回double
  floor(double a) //返回double
  rint(double a)  //返回四舍五入后的整数值，double
  round(float a)  //返回四舍五入后的整数值, int
  round(double a) //返回四舍五入后的整数值, long
  
  //要求a、b类型相同，返回类型一致
  max(a,b)  //返回a和b的最大值
  min(a,b)  //返回a和b的最小值 
  
  //随机数
  random(); //得到一个[0,1)之间的随机数，返回double
  (int)(Math.random()*60 + 20)
  (int)(Math.random()*60)+ 20
  //使用随机函数获得20~80的随机整数
  ```

## java.util

* 日期时间类

  ```java
  //构造
  public Date()
  public Date(int year, int month, int date)
  public Date(int year, int month, int date, int hours,int minutes)
  public Date(int year, int month, int date, int hours, int minutes, int seconds)
  
  //获取
  public int getYear(); 
  public int getMonth();
  public int getDate();      
  public int getDay();
  public int getHours();
  public int getMinutes();      
  public int getSeconds();      
  public boolean before(Date when);
  
  //比较
  public boolean before(Date when)；
  public boolean after(Date when);
  public boolean equals(Object obj);
  
  //转换
  public String toString()
  ```

* `vector<E>`

  ```java
  //构造
  Vector();
  Vector(int capacity);
  Vector(int capacity, int capacityIncrement);
  //eg
  Vector<String> vector1=new Vector<String>(5);
  
  //修改
  boolean add(E e);
  void insertElementAt(E obj, int index);
  void setElementAt(E obj, int index);
  void removeElementAt(int index);
  clear()
  
  //获取
  boolean contains(Object o);
  int indexOf(Object o);
  E elementAt(int index);
  int capacity()
  int size()
  ```

* `Hashtable<K,V>`

  ```java
  new Hashtable <K,V>();
  V put (K key, V value);
  V get (Object key); //关键字匹配
  V remove(Object key); 
  ```

  * 覆盖`equals`方法和`hashCode`方法
    * 原因：关键字匹配时，系统会自动调用关键字的equals方法，如果结果为true且两个关键字的hashCode()方法的结果也相等，则匹配成功。如果没有在关键字类中覆盖equals方法和hashCode方法，则系统会去调用继承自Object类的equals方法和继承自Object类的hashCode方法。Object类的equals方法是在比较两个对象的地址。Object类的hashCode方法是计算对象的地址的散列值。所以这时就算两个关键字对象实体值（即对象内容）相同，也不会匹配。
    * 要求
      * 值相同的两个关键字对象用equals方法比较后相等
      * 值相同的两个关键字对象的hashCode方法结果相等

  ```java
  class A {
      int date;
      public boolean equals(Object obj) {
      	A aobj=null;
       	if (obj instanceof A) {
  			aobj=(A)obj;
        		if (this.date==aobj.date) 
              	return true;
        		else return false;
       	}
       	else return false;
      }
      public int hashCode() { return date;}
  }
  ```

* `Stack<E>`

  ```java
  Stack()     
  E push (E item)
  E pop ()
  E peek()
  boolean empty()
  ```

* ***集合类***

* `Arrays`

  ```java
  //使用Arrays.sort来对数组排序
  java.util.Arrays.sort(x);
  
  //使用Arrays.binarySearch函数对数组进行二分查找
  //如果没找到，则会输出负数
  java.util.Arrays.binarySearch(x,1));
  
  //数组x中的4个元素都改为7
  java.util.Arrays.fill(x,7);
  ```


## java.io

* 字节流

  * InputStream和OutputStream是所有面向字节的输入输出流的超类

    ```java
    public int read() throws IOException
    public int read( byte[] b ) throws IOException
    public int read( byte[] b, int off, int len ) throws IOException
    void write(int b) throws IOException
    void write( byte[] b ) throws IOException
    void write( byte[] b, int off, int len ) throws IOException	
    ```

  * FileInputStream和FileOutputStream

    ```java
    FileInputStream fs=new FileInputStream("a.txt");
    File file=new File ("a.txt");
    FileInputStream fs=new FileInputStream(file);
    
    FileOutputStream(File file) 
    FileOutputStream(File file, boolean append) 
    FileOutputStream(FileDescriptor fdObj)     
    FileOutputStream(String name) 
    FileOutputStream(String name, boolean append)
    ```

  * 过滤流 

    必须将过滤流和节点流连接。连接是通过在过滤流的构造方法中指定入口参数——某个节点流对象来实现的。

    ```java
    FileInputStream in=new FileInputStream(“text”);
    BufferedInputStream bufin=new BufferedInputStream(in);
    ```

    * BufferedInputStream和BufferedOutputStream

      ```java
      public BufferedInputStream(InputStream in); public BufferedInputStream(InputStream in,int size);
      ```

    * ObjectInputStream和ObjectOutputStream

* 字符流

  * Reader和Writer

    是所有面向字符的输入输出流的超类

    ```java
    public int read() throws IOException
    public int read(char[] cbuf) throws IOException 
    public int read(char[] cbuf,int off,int len) throws IOException  
    void write(String str) throws IOException
    void write(char[] cbuf) throws IOException 
    void write(char[] cbuf,int off,int len) throws IOException  
    ```

  * FileReader和FileWriter

    ```java
    File f=new File(“d:\\t1.txt”); 
    FileReader f1=new FileReader(f);
    FileReader f2=new FileReader(“d:\\t1.txt”);
    
    File f=new File(“d:\\t1.txt”); 
    FileWriter f1=new FileWriter(f);   
    FileWriter f2=new FileWriter(“d:\\t1.txt”);
    ```

  * InputStreamReader和OutputStreamReader

    把字节流转换成字符流

    ```java
    public InputStreamReader(InputStream in)
    public InputStreamReader(InputStream in,String enc) 
    public OutputStreamWriter(OutputStream out);
    public OutputStreamWriter(OutputStream out,String enc) 
    ```

* 输入汉字的时候，因为相当于读取了字符的高/低位字节，并未读取完整的汉字。因此需要将字节流转换为字符流。

  ```java
  InputStreamReader isr=new InputStreamReader(System.in);
  	try {
  		c=(char)isr.read();
  		System.out.println(c);
      } catch (IOException e){}
  ```

* `File`

  * 在Java中目录和文件都用File类表示，File类建立了Java语言和磁盘文件的联系，File类不能于文件内容的访问。

  ```java
  //构造
  File(String pathname)
  File(File parent, String child) 
  File(String parent, String child)
  File(URI uri)
  
  /* pathname和child指定文件名；
  parent指定目录名，目录名既可以是字符串，也可以是File对象；
  uri是统一资源标识符（见java.net包）
  要表示‘\’字符（反斜杠）要用转义字符‘\\’ */
  
  //文件操作类方法
  public boolean createNewFile()
  public boolean renameTo(File dest)
  public boolean delete()
  
  //目录操作类方法
  public boolean mkdir()
  public String[] list() 
  public File[] listFiles() 
  
  //获取文件属性
  ...
      
  //使用File类创建文件、目录
  import java.io.File; 
  public class creatFile{
      public static void main(String[] args) {
          try {
              //创建文件
              File f1=new File("H:\\a.txt");
              boolean success=f1.createNewFile();
              //创建目录
              //File f1=new File("H:\\a");
              //boolean success=f1.mkdir();
              if(success) {
                       System.out.println("Creat Successfully");}
              else {
                  System.out.println(f1.getPath());
              }
            } catch(Exception e) {
                   System.out.println(e.toString());
            }
  	}  
  }
  ```

## 泛型程序设计

* 泛型的本质是参数化类型，编写的代码可以被很多不同类型的对象或数据所重用，也就是说所操作的数据类型被指定为一个参数。使得程序具有更好的可读性和安全性。

* **访问 List<T> 与 ArrayList 的对比**

  <img src="https://s2.loli.net/2022/01/07/U5IOWlGEuj8fpSH.png" style="zoom:50%;" />

# GUI

## Frame(JFrame)

* Frame类的对象开始是不可见的，要调用show()方法 (或setVisible(true)方法) 才能显示出来，也可以调用hide()方法将其隐藏。框架对象被创建后就可使用add()方法将其它组件加入到框架中。
* Frame和Dialog是Window的子类，它们都是窗口类，默认的布局管理器都是 **BorderLayout** 

```java
Frame()        //创建一个不带标题的框架
Frame(String)  //创建一个带标题的框架
    
show()                  //显示框架
setVisible(boolean b)   //使框架可见/不可见
hide()                  //隐藏框架
setTitle()              //设置框架的标题
setSize(int w, int h)   //调整框架的尺寸(宽/高为w/h)
setBounds(int x, int y, int w,int h)
//调整框架的位置及尺寸(左上角为(x,y), 宽、高为w、h)
add(Component ob)
//将其它组件ob加入到框架的中心位置 
add(String p, Component ob)   
//将组件ob加入到框架的p位置 (框架默认的布局方式是BorderLayout,  它将容器划分为东西南北中)
```

## panel(Jpanel) 

* 面板panel(Jpanel)是能在屏幕上实际显示的组件，提供了容纳其他组件的功能，但本身必须放在Window,Frame,Dialog等容器中才能使用
* 所有面板的默认的布局管理器是**FlowLayout**,即按照从左至右、从上到下的方式布局
* java.applet.Applet是java.awt.panel的子类

```java
import java.awt.*;
import java.applet.*;
public class ContainerApplet extends Applet
{
    public void init(){
          setLayout(new GridLayout(1,2,10,10));
          Panel Panel1=new Panel();
          Panel Panel2=new Panel();
          add(Panel1);
          add(Panel2);
          Panel1.add(new Button(“Up”));
          Panel1.add(new Button(“Down”));
    }
 }
```

## button

流程：定义一个按钮对象；用new实例化按钮对象；（可以与上一步合并）；用add方法将按钮加入容器中。

```java
Button()             //生成一个没有标记的按钮
Button(String label) //生成一个带标记label的按钮

setLabel(String label) //设置按钮标记 
getLabel()             //获取按钮标记
setEnabled(boolean)    //能否点击
setActionCommand(String s)
//设置用户按下按钮时返回的信息
addActionListener(ActionListener l) 
//将l指定为按钮的监听者
removeActionListener(ActionListener l) 
//将l从按钮监听者中去掉
```

## 标签(Lable)

```java
la1=new Label();
la2=new Label("Label2");

getAlignment()       //获取对齐方式
getText()            //获取文本
setAlignment(int aligmnent)  //设置对齐方式 Label.CENTER
setText(String text)         //设置文本
    
//JLabel中是调用
setHorizontalAlignment(SwingConstants.CENTER);
```

## 文本框(TextField)

```java
TextField()              //创建一个空的文本框
TextField(Strint text)   //创建一个带有初始文本的文本框
TextField(int Columns)   //创建一个指定列数的文本框    
TextField(String text, int colulmns)
//创建一个指定列数和带有初始文本的文本框 

addActionListener(ActionListener l)
//将l指定为文本框的ActionEvent事件监听者 
removeActionListener(ActionListener l)
//将l从文本框的监听者中去掉
setEchoChar(String sc)   //设置用户输入的回应字符'*'密码
getEchoChar()            //获取回应字符 
setText(String s)        //设置文本框中的字符串 
getText()                //获取文本框中的字符串 
```

## 布局管理器

* 边界布局 BorderLayout

  * **BorderLayout是容器JFrame和JApplet的默认布局方式****
  * 将容器分成五个区域，NORTH(顶部)，SOUTH(底部)，WEST (左侧)，EAST(右侧)，CENTER(中间)，每个区域最多只能1个组件

  ```java
  add(new Button("South"), BorderLayout.SOUTH); 
  add(new Button("South"),"South");
  add("South",new Button("South"));
  
  BorderLayout() 
  //构造一个组件之间没有间距的新边界布局。 
  BorderLayout(int hgap, int vgap) 
  //用指定的组件之间的水平间距构造一个边界布局。
  ```

* 顺序布局 FlowLayout

  * **FlowLayout面板Panel和它的子类Applet的默认布局方式**
  * 将组件从左到右依次排列，一行排满就转到下一行继续排列，直到所有的组件都排列完毕。

  ```java
  Frame f=new Frame();
  f.setLayout(new FlowLayout());
  
  public FlowLayout()
  //创建一个新的FlowLayout，其默认值是居中对齐，默认组件彼此有5单位的水平与垂直间距。
  public FlowLayout(int align)
  //创建一个新的FlowLayout，此FlowLayout可以设置对齐（align）方式，对齐必须是LEFT、CENTER或RIGHT之一。默认组件彼此有5单位的水平与垂直间距。
  public FlowLayout(int align,int hgap,int vgap)
  //创建一个新的FlowLayout，可以自己设置对齐方式、水平间隔和垂直间隔。
  ```

* 网格布局 GridLayout

  * 网格布局比顺序布局多了行和列的设置，也就是说要先设置网格布局共有几行几列。然后加进去的组件会先填完第一行格子，然后再从第二行开始填，依此类推，就像是一个个的格子一般。而且网格布局会将填进去的组件大小设为一样。

  ```java
  public GridLayout()
  public GridLayout(int rows,int cols)
  public GridLayout(int rows,int cols,int hgap,int vgap)
  ```

## 事件处理

* 事件源：事件源是一个事件的产生者。各种图形组件都可以作为事件源

* 事件对象

  * 图形组件产生的事件
  * 一个事件对象包含了以下信息：id----事件的类型。如按键事件、单击鼠标事件等。target----发生事件的对象。when----指出事件发生的时间。x, y----发生事件的坐标。key----键盘事件中被按下的键。arg----一个与事件相关的参数。modifier----修饰键的状态(即Alt,Ctrl键的状态)
  * 主要的事件对象
    * ComponentEvent（ 组件事件：组件尺寸的变化，移动） 
    * ContainerEvent（ 容器事件：组件增加，移动） 
    * WindowEvent（ 窗口事件：关闭窗口，窗口闭合，图标化） 
    * FocusEvent（ 焦点事件：焦点的获得和丢失） 
    * KeyEvent（ 键盘事件：键按下、释放） 
    * **MouseEvent**（ 鼠标事件：鼠标单击，移动）
    * ActionEvent（动作事件：按钮按下，TextField中按Enter键） 
    * TextEvent（文本事件：文本对象改变）

  ```java
  public interface KeyListener extends EventListener 
  {public void keyPressed(KeyEvent ev); …}
  ```

* 事件监听器

  * 事件监听器就是一个接收事件、解释事件并处理用户交互的方法。事件产生以后，不是由事件源或者其容器对象处理事件，而是将事件委托给事件监听器来处理。监听器包含事件处理程序。
  * 事件源和监听器对象通过注册的方式建立关联。当事件源发生事件时，事件监听者就代替事件源对事件进行处理。
  * 每类事件都有对应的事件监听器，监听器是接口，根据动作来定义方法。 


|     事件监听器      |                       事件响应函数                        |
| :-----------------: | :-------------------------------------------------------: |
|  **MouseListener**  | **mouseClicked/mouseEntered  /mouseExited/mousePressed/** |
| MouseMotionListener |                  mouseMoved/mouseDragged                  |
|   WindowListener    |                windowOpened/windowClosing                 |
|   ActionListener    |                      actionPerformed                      |

* **事件的处理方法流程**

  * **明确事件源是什么，也就是什么组件要被处理。**
  * **明确什么样的事件要被处理。**
  * **在事件监听器的相应事件响应函数中实现自己的功能。**
  
  ```java
  import java.awt.*;
  import java.awt.event.*;
  public class test {
      public static void main(String []args) {
          Frame f=new Frame("我的第一个窗口");
          f.setSize(400,300);
          f.setLayout(null);
          f.addWindowListener(new MyWindowAdapter()); 
          f.setVisible(true);
          //创建窗口后要调用setVisible(true)才能显示出来
      }
  }
  
  class MyWindowAdapter extends WindowAdapter
  {public void windowClosing(WindowEvent e)
  {System.exit(0);}}
  
  //创建了一个匿名内部类对象
  import java.awt.*;
  import java.awt.event.*;
  public class test {
      public static void main(String []args) {
          Frame f=new Frame("我的第一个窗口");
          f.setSize(400,300);
          f.setLayout(null);
          f.addWindowListener(new WindowAdapter() {
              public void windowClosing(WindowEvent e) {
                  System.exit(0);
              }
          });
          f.setVisible(true);
          //创建窗口后要调用setVisible(true)才能显示出来
      }
  }
  
  //按钮上响应点击鼠标事件（MouseClicked）为例
  JButton jButton1 = new JButton();
  jButton1.addMouseListener(new MymouseAdapter());
  class MymouseAdapter extends MouseAdapter 
  {public void mouseClicked(MouseEvent e) {……}}
  //或者匿名内部类
  frame.add(jButton1);
  //元件要 add()
  ```

## 字体、颜色外观

```java
//颜色和字体setBackground, setForeground, setFont
//位置和大小setBounds, setLocation, setSize
import java.awt.*; 
public class Demo 
{
    static Font ff=new Font("黑体", Font.ITALIC, 30);
    public static void main(String args[])
    {
        Frame f=new Frame();
        f.setLayout(new FlowLayout());
        Button b1=new Button("B1");
        Button b2=new Button("B2");
        b2.setBackground(Color.blue);
        b2.setForeground(new Color(200,100,0));//红   
        b2.setFont(ff);
        b1.setBounds(30,40,60,20);
   		b2.setLocation(100,40);   
   		b2.setSize(50,50);
        f.add(b1);
        f.add(b2);
        f.setSize(180,100);
        f.show();
    }
}
```

## 图形绘制

* 要绘制图形，必须具备两个要素：画布和画笔

* Swing中任何JComponent类的子类都可以充当画布的角色，任何java.awt.Component类的子类都可以作为画布

* 所有swing控件都有一个paint方法，负责在需要的时候对控件进行绘制，**一定要在绘制的时候覆盖** `public void paint (Graphics g)`

* paint方法中的参数g就是画笔，paint方法是自动调用的，当第一次显示组件或改变组件的大小需要重新画组件的界面时，该方法都会由系统自动调用

* 实际开发中，通常都是采用继承JComponent或JPanel类并重写paint的方式来获得画布和画笔的，然后加到顶层容器中；也可以直接重写窗口Frame类的paint方法

  ```java
  class MyComponent extends JComponent {    
      public void paint (Graphics g) {
      	g.setColor(Color.BLACK);
      	g.drawString(str,x,y);
      	g.drawOval(x,y,w,h);
      	g.fiilOval(x,y,w,h); 
      	g.drawRect(x,y,w,h);
      	g.fillRect(x,y,w,h);
      	g.drawLine(x1,y1,x2,y2);
      	g.drawArc(x,y,w,h,startAngle,arcAngle);
      }
  }        
  MyComponent m=new MyComponet();
  add(m);
  ```

* Graphics对象的获取总共有两种方法

  * 通过paint方法接收的参数来获得对象，paint方法是由系统调用的，调用时系统会将需要的Graphics对象引用传给该方法。然后在paint方法中收到这个参数就可以在指定的画布上画画了
  * 通过相应的getGraphics方法来获得Graphics对象，所有Component类子类对象都有这个方法，但对于控件一般不应该使用此方法获取画笔，而是通过第一种

* 坐标系统：绘制图形采用的是笛卡尔坐标系统，该坐标都是以像素为单位。画布上左上角为该坐标的原点（0,0）位置，x轴向右延伸，y轴向下延伸

* 定位：在一个画布上定位某个图形时，是通过图形的最左上的定位进行的

```java
//按钮，一会画笑脸，一会画哭脸
//drawArc （x y 宽 高 起始角 转角）（逆时针，0向右）
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SmileSad extends Frame {
    static boolean smile;
    public void paint(Graphics g) {
        g.setColor(Color.blue);
        g.drawOval(50,50,80,100);
        g.fillOval(70,80,14,7);
        g.fillOval(110,80,14,7);
        if (smile) {
            g.drawArc(70,110,40,20,180,180);
        }
        else {
            g.drawArc(70,110,40,20,0,180);
        }
    }
    public static void main(String[] args) {
        SmileSad f=new SmileSad();
        f.setLayout(null);
        f.setTitle("SmileSad");
        f.setSize(250,200);
        JButton btn = new JButton("trans");
        btn.setBounds(130,130,100,20);
        btn.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                smile = !smile;
                f.repaint();
            }
        });
        f.add(btn);
        f.setVisible(true);
    }
}


//动画：1秒rect，1秒circle
import javax.swing.*;
import java.awt.*;

public class RectCircle extends JFrame implements Runnable {
    static boolean b = true;
    public RectCircle() {
        setBounds(100, 100, 300, 200);
        setTitle("RectCircle");
        setVisible(true);
    }
    public void paint(Graphics g) {
        super.paint(g);
        g.setColor(Color.red);
        if (b) g.drawRect(40, 50, 100, 100);
        else g.drawOval(40, 50, 150, 100);
    }

    public void run() {
        try {
            while(true) {
                Thread.sleep(1000);
                b = !b;
                repaint();
            }
        } catch (InterruptedException e) {
            System.out.println(e);
        }
    }

    public static void main(String[] args) {
        Thread t = new Thread(new RectCircle());
        t.start();
    }
}
```

# 多线程

## 概念

* 程序：一段静态的代码，应用程序执行的蓝本。
* 进程：程序的一次动态执行过程。
* 线程：程序内部的控制流，比进程更小的执行单位。一个进程在执行过程中，为了同时完成多个操作，可以产生多个线程，形成多条执行线索。
* 进程和线程的区别
  * 每个进程有一段专有内存空间。进程各自占有不同空间，内存消耗很大，会造成系统在不同程序之间切换时开销很大，进程之间通信速度很慢。
  * 同一进程的各线程之间共享相同内存空间，利用共享内存来实现数据交换、实时通信及必要的同步工作。线程之间通信速度快，相互切换所占系统资源也小。
* 线程自身不能够自动运行，必须栖身于某一进程中，由进程触发，每个Java应用程序运行时都对应一个进程——主线程

## 实现

* 声明一个` Thread `类的子类，并覆盖 `run() `方法

  * 步骤
    * 定义一个`Thread`类的扩展类
    * 覆盖`public void run()`方法
    * 创建对象(用构造方法)
    * 调用该对象的`start()`方法，将该线程启动（注意不能直接调用`run()`方法）, `start()`方法引起`run`的调用

  ```java
  //编写一个简单的程序，要求它按两个不同的时间间隔（1秒和3秒）在屏幕上连续显示当前时间
  import java.util.*;
  class TimePrinter extends Thread {
      int pauseTime;
      String name;
      public TimePrinter(int x, String n) {
          pauseTime = x;
          name = n;
      }
      public void run() {
          while(true) {
              try {
                  System.out.println(name + ":" + new Date(System.currentTimeMillis()));
                  Thread.sleep(pauseTime);
              } catch(Exception e) {
                  System.out.println(e);
              }
          }
      }
      public static void main(String args[]) {
          TimePrinter tp1 = 
              new TimePrinter(1000, "Fast Guy");
          tp1.start();
          TimePrinter tp2 = 
              new TimePrinter(3000, "Slow Guy");
          tp2.start();
      }
  }
  
  //编写一个窗体，Applet窗体宽300，高100，布局管理器为null，窗体上有一个标签和一个按钮，标签的位置是（10,20），按钮的位置是（100,60），它们的宽度和高度都是80和20。 再编写一个线程，该线程可以让标签向右移动10次，每次移动10个单位，间隔1秒，通过按钮的动作事件启动上述线程。
  import javax.swing.*;
  import java.awt.*;
  import java.awt.event.*;
  
  public class moveThread extends Thread {
      JLabel lb;
      public moveThread(JLabel lb) {this.lb=lb;}
      public void run() {
          for(int i=0;i<10;i++) {
              try {
                  lb.setBounds(lb.getX()+10,20,80,20);
                  Thread.sleep(1000);
              } catch(InterruptedException ie) {ie.printStackTrace();}
          }
      }
  
      public static void main(String[] args) {
          JFrame f = new JFrame();
          f.setSize(300,100);
          f.setLayout(null);
          JLabel lb = new JLabel("向右移标签");
          lb.setBounds(10,20,80,20);
          f.add(lb);
          JButton btn = new JButton("向右走");
          btn.setBounds(100,60,80,20);
          f.add(btn);
          moveThread t =new moveThread(lb);
          btn.addActionListener(new ActionListener() {
              public void actionPerformed(ActionEvent e) {t.start();}
          });
          f.setVisible(true);
      }
  }
  ```
  
* 声明一个实现 `Runnable` 接口的类，并实现` run() `方法

  * 在创建线程时还是用`Thread`类创建线程对象，把实现`Runnable`接口的类的对象作为`Thread`类的构造方法的参数,再调用`Thread`类对象的`start()`方法
  * 步骤
    * 定义一个实现`Runnable`接口的类
    * 实现`public void run()`方法(必须实现)
    * 将该类的对象作为`Thread`类构造方法的参数，创建一个线程实例
    * 调用该对象的`start()`方法启动线程

  ```java
  //编写一个简单的程序，要求它按两个不同的时间间隔（1秒和3秒）在屏幕上连续显示当前时间
  import java.util.*;
  class TimePrinter implements Runnable {
      int pauseTime;
      String name;
      public TimePrinter(int x, String n) {
          pauseTime = x;
          name = n;
      }
      public void run() {
          while(true) {
              try {
                  System.out.println(name + ":" + new Date(System.currentTimeMillis()));
                  Thread.sleep(pauseTime);
              } catch(Exception e) {
                  System.out.println(e);
              }
          }
      }
      public static void main(String args[]) {
          Thread t1 = new Thread(new TimePrinter(1000, "Fast Guy"));
          t1.start();
          Thread t2 = new Thread(new TimePrinter(3000, "Slow Guy"));
          t2.start();
      }
  }
  ```

* 比较
  * 实现Runnable接口的优势：符合OO设计的思想，便于用extends继承其它类。
  * 采用继承Thread类方法的优点：程序代码更简单。
  * 通过Thread实例的start()，一个Thread的实例只能产生一个线程
  * Runnable的实例是可运行的，但它自己并不能直接运行，它需要被Thread对象来包装才行运行 ，但同一实例(Runnable实例)可产生多个线程

## Thread类

```java
//构造
//target实际执行线程体的目标对象，它必须实现接口Runnable ，任何实现接口Runnable的对象都可以作为一个线程的目标对象
public Thread()
public Thread(Runnable target)
public Thread(String name)

public native synchronized void start()
//开始运行当前线程；
public void run()
//该方法用来定义线程体。一旦线程被启动执行，就开始执行
public final void stop()
//强制当前线程停止运行，并抛出ThreadDead错误；
public void destroy()
//撤消当前线程；
public final native boolean isAlive()
//测试当前线程是否在活动；
public final void suspend()
//临时挂起当前线程；
public final void resume()
//恢复运行挂起的线程；
public static native Thread currentThread()
//返回当前活动线程的引用；

//调用该方法将CPU让给具有与当前线程相同优先级的线程。如果没有同等优先级的线程是Runnable状态，yield()方法将什么也不做。
public static native void yield()

//sleep()
//该方法用来使一个线程暂停运行一段固定的时间。在线程睡眠时间内，将运行别的线程,线程将进入就绪(Runnable)状态
//需要捕获异常IOException
public static native void sleep(long millis)
	throws InterruptedException
//使当前活动线程睡眠指定的时间millisme;
public static void sleep(long millis,int nanos)
	throws InterruptedException
//使当前活动线程睡眠指定的时间millisme加上十万分之nanos秒；

//join()方法使当前的线程等待，直到结束为止，线程恢复到运行状态。
//如当前线程发出调用t.join()，则当前线程将等待线程t结束后(最多等待设置的时间)再继续执行
join()
join(long millis)
join(long millis,long nanos) 
    throws InterruptedException
    
//interrupt()
//如果t在调用sleep()、join()、wait()等方法被阻塞时，则该方法将中断t的阻塞状态，并将接收InterruptException。
t.interrupt()

//优先级控制，优先级高的先被调度
public final void setPriority(int newPriouity)  
//设置线程的优先级，可以在MIN_PRIORITY=1、NORM_PRIORIITY=5和MAX_PRIORITY=10之间
public final int getPriority()
//获得当前线程的优先级
    
public final void setName(String name)
//设置线程名；
public final String getName()
//得到当前线程名；  
    
//常用主要方法
//启动和停止
start() stop()
//等待和通知
wait(), notify()
//睡眠
sleep()
//挂起和恢复
suspend(), resume() 
//撤消线程
destroy()
join()
yield()
isAlive()
setPriority() 
 
//抛出异常
sleep join wait
    
//静态方法：Thread类中的静态方法表示操作的线程是"正在执行静态方法所在的代码块的线程"，这样就能对CPU当前正在运行的线程进行操作。
currentThread sleep yield interrupt
```

## 生命周期

* 创建状态：当一个线程处于创建状态时，它仅仅是一个空的线程对象，系统不为它分配资源。 

* 可运行状态：当一个线程处于可运行状态时，系统为这个线程分配了它需的系统资源，安排其运行并调用线程运行方法，这样就使得该线程处于可运行( Runnable )状态。这一状态并不是运行中状态（Running )，因为线程也许实际上并未真正运行。单处理器的计算机要在同一时刻运行所有的处于可运行状态的线程是不可能的，Java的运行系统必须实现调度来保证这些线程共享处理器。 

* 不可运行状态

  当下面5种情况发生时，线程就进入不可运行状态:

  1. 调用了`sleep()`方法；
  2. 调用了`suspend()`方法；
  3. 为等候一个条件变量，线程调用`wait()`方法；
  4. 输入输出流中发生线程阻塞。
  5. 线程试图调用另一个对象的同步方法，但那个对象处于对象锁定状态，暂时无法使用

  上面5种情况，要使线程返回可运行状态，各有特定的方法与之对应： 
  1) 如果线程处于睡眠状态中，`sleep()`方法中的参数为睡眠时间，当这个时间过去后，线程即为可运行的；
  2) 如果一个线程被挂起，要使该线程重新处于可运行状态，需调用`resume()`方法；
  3) 如果线程在等待条件变量，那么要停止等待的话，需要该条件变量的线程对象调用`notifyAll()`方法；
  4) 如果在I/O流中发生线程阻塞，则特定的I/O完成后可结束这种不可运行状态。
  5) 同步的方法完成，释放了同步锁

* 死亡状态

  * 自然撤消
  * 调用`stop()`方法停止当前线程 

<img src="https://s2.loli.net/2022/01/08/tEvKjzdAL26nYqf.png" alt="image-20220108113753735" style="zoom: 33%;" />

## 同步互斥

* 把一个方法声明为`synchronized`有效地防止冲突.调用任何synchronized方法时，对象就会被锁定，不可调用那个对象的其他任何synchronized方法。　　　
* wait:导致当前线程等待，直到另一个线程调用该对象的notify()方法或notifyAll()方法，该方法是会释放锁的。
* notify：唤醒正在等待对象监视器的单个线程。 如果任何线程正在等待这个对象，其中一个被选择被唤醒。
* wait和notify（notifyAll）必须配合synchronized使用，而且wait必须在notify前用，wait后就会进入notify所在的线程，notify后唤醒wait所在的线程，但是wait所在的线程仍然没有获取锁，需要等待notify所在的线程释放锁。
* 不但可以把一个方法设定为synchronized，还可以把一段代码设定为同步的，这块代码称作“关键区域”或“同步块”

```java
//同步堆栈（线程安全堆栈）
class SyncStack {
    private int index = 0; //堆栈指针初始值为0
    private char []buffer = new char[6];
    public synchronized void push(char c){ //加上互斥锁
        while(index == buffer.length){ 
            try{
                this.wait(); //等待，直到有数据出栈
            }catch(InterruptedException e){}
        }
        this.notify(); //通知其它线程把数据出栈
        buffer[index] = c;
        index++;
    }
    public synchronized char pop(){ //加上互斥锁 
        while(index ==0){
            try{
                this.wait(); //等待其它线程把数据入栈
            }catch(InterruptedException e){}
        } 
        this.notify(); //通知其它线程入栈 
        index--; 
        return buffer[index];
    }
    /***main***/
} 

//设计两个线程，其中一个线程IncThread，工作流程为循环10次，每次对共享变量J增加1（函数为inc()），另外一个线程DecThread，工作流程为循环10次，每次对共享变量J减少1(函数为dec())，在主程序中启动两个线程进行并发执行。在改写数据过程中利用同步机制保障数据的一致性。
class data {
    int j = 0;
    public synchronized void inc(){j++;}
    public synchronized void dec(){j--;}
}
class IncThread extends Thread {
    data d;
    public IncThread(data dtemp){ d=dtemp;}
    public void run() { for(int i=0; i<10; i++) d.inc();}
}
class DecThread extends Thread {
    data d;
    public DecThread(data dtemp){d=dtemp;}
    public void run() { for(int i=0; i<10; i++) d.dec();}
}
public class test {
    public static void main(String[] arg) {
        data d = new data();
        IncThread Inc = new IncThread(d);
        DecThread Dec = new DecThread(d);
        Inc.start();
        Dec.start();
    }
}
```

## 传递参数

* 通过构造方法传递数据

  在创建线程对象的同时传递数据，在线程运行之前这数据就已经到位了，不会造成数据在线程运行后才传入的现象。使用构造方法来传递数据虽然比较安全，但如果要传递的数据比较多时，就会造成很多不便。由于Java没有默认参数，要想实现类似默认参数的效果，就得使用重载，这样不但使构造方法本身过于复杂，又会使构造方法在数量上大增。

* 通过变量和方法传递数据

  在类中定义一系列的public的方法或变量。然后在建立完对象后，通过对象实例逐个赋值。例如使用了一个setName方法来设置name变量

```java
public class MyThread implements Runnable {
    private String name;
    public MyThread() {this.name = "unknown";}
    public MyThread(String name) {this.name = name;}
    public void setName(String name) {this.name = name;}
    public void run() {System.out.println("hello " + name);}
    public static void main(String[] args)
    {
        MyThread myt1 = new MyThread();
        myt1.setName("001");
        Thread t1 = new Thread(myt1);
        t1.start();
        MyThread myt2 = new MyThread("002");
        Thread t2 = new Thread(myt2);
        t2.start();
    }
}
```

* 通过回调函数传递数据

  上面讨论的两种向线程中传递数据的方法是最常用的。但这两种方法都是main方法中主动将数据传入线程类的。这对于线程来说，是被动接收这些数据的。然而，在有些应用中需要在线程运行的过程中动态地获取数据，如在下面代码的run方法中产生了3个随机数，然后通过Work类的process方法求这三个随机数的和，并通过Data类的value将结果返回。从这个例子可以看出，在返回value之前，必须要得到三个随机数。也就是说，这个value是无法事先就传入线程类的。

```java
class Work {
    int value = 0;
    public void process(int[] nums) {for (int n : nums) {value += n;}}
    public int getValue() {return value;}
}
public class demoThread extends Thread {
    private final Work work;
    int count = 1;
    public demoThread() {this.work = new Work();}
    public void run()
    {
        try {
            while (count <= 5) {
                java.util.Random random = new java.util.Random();
                int[] nums = new int[2];
                nums[0] = random.nextInt(10);
                nums[1] = random.nextInt(20);
                work.process(nums);   // 使用回调函数
                System.out.println("<" + count + "> " + nums[0] + "+" + nums[1] + "==" + work.getValue());
                count++;
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {e.printStackTrace();}
    }
    public static void main(String[] args)
    {
        Thread thread = new demoThread();
        thread.start();
    }
}
```



# JDBC

## 步骤

* 建立数据源
* 加载驱动程序：Class类的forName方法，将驱动程序类加载到JVM中
* 获得连接对象：使用DriverManager类的静态方法getConnection来获得连接对象
* 创建语句对象：通过Connection对象的createStatement方法来创建语句对象，才可以执行SQL语句；
* 执行SQL语句：使用语句对象来执行SQL语句，有两种情况：
  * 一种是执行DELETE、UPDATE和INSERT之类的数据库操作语句（DML），这样的语句没有数据结果返回，使用Statement对象的executeUpdate方法执行；
  * 另一种是执行SELECT这样的数据查询语句（DQL），这样的语句将从数据库中获得所需的数据，使用Statement对象的executeQuery 方法执行；
* 关闭资源：当对数据库的操作结束后，应当将所有已经被打开的资源关闭，否则将会造成资源泄漏；Connection对象、Statement对象和ResultSet对象都有执行关闭的close方法；有可能抛出SQLException异常，必须捕捉；请注意关闭的顺序，最后打开的资源最先关闭，最先打开的资源最后关闭。

<img src="https://s2.loli.net/2022/01/08/rWvHKBC3d8VReYq.png" style="zoom: 50%;" />

```java
import java.sql.*;    //导入java.sql包
public class JDBCDemo {
  public static void main(String[] args) {
    String strCon = "jdbc:odbc:myODBC";  //连接字符串
    String strUser = "sa";               //数据库用户名
    String strPwd = "";                  //口令
    System.out.println("正在连接数据库...");
    try {  //监控异常
      Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");  //加载驱动程序
      Connection con = DriverManager.getConnection(strCon, strUser, strPwd);
      //获得连接对象
      System.out.println("成功连接到数据库。");
      Statement sta = con.createStatement();    //创建语句对象
      //执行SQL语句
      String strSql = "DELETE FROM Friends WHERE [Name] = '郑六'";
      int count = sta.executeUpdate(strSql);
      System.out.println("成功删除" + count + "行数据。");
      sta.close();
      con.close();    
      //关闭所有已经打开的资源
    } catch (ClassNotFoundException cnfe) { cnfe.printStackTrace(); }
    catch (SQLException sqle) { sqle.printStackTrace(); } }
}
```

## 操作结果集

```java
try {
  String strCon = "jdbc:odbc:MyODBC";
  System.out.println("正在连接数据库...");
  Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
  Connection con;
  con = DriverManager.getConnection(strCon, "sa", "");
  System.out.println("成功连接到数据库。");
  Statement sta = con.createStatement();
  ResultSet rs = sta.executeQuery("SELECT * FROM Friends");
  System.out.println("查询到数据如下：");
  while (rs.next()) {        //循环将结果集游标往下移动，到达末尾返回false
    //根据字段名称获得各个字段的值
    System.out.print(rs.getString("Name") + "\t");     //获得字符串
    System.out.print(rs.getString("Address") + "\t");  //获得字符串
    System.out.print(rs.getInt("Telephone") + "\t");   //获得整数
    System.out.print(rs.getDate("HireDate") + "\t");   //获得日期型数据
    System.out.println(rs.getFloat("Salary"));         //获得浮点型数据
  }
     rs.close();
    sta.close();
    con.close();
} catch (ClassNotFoundException cnfe) { cnfe.printStackTrace(); }
  catch (SQLException sqle) { sqle.printStackTrace(); }
```

## PreparedStatement接口

* 如果要多次执行相似的SQL语句，可以使用PreparedStatemend（预编译语句对象）对象来执行；
* 通过Connection对象的prepareStatement方法来创建预编译语句对象；
* PreparedStatement对象会将SQL语句预先编译，这样将会获得比Statement对象更高的执行效率
* 索引从1开始

```java
String strCon = "jdbc:odbc:MyODBC";
System.out.println("正在连接数据库...");
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection con = DriverManager.getConnection(strCon, "sa", "");
System.out.println("成功连接到数据库。");

PreparedStatement ps = con.prepareStatement("UPDATE Friends SET Address = ? WHERE Name = ?");
//使用带参数的SQL语句创建PreparedStatement对象
//设置SQL语句中的参数值

ps.setString(1, "长沙");
ps.setString(2, "王五");
int count = ps.executeUpdate();     //执行命令
System.out.println("成功更新了" + count + "行数据。");   
ps.close();    //关闭资源
con.close();
```

## 纯Java驱动连接MySQL

* 使用纯Java驱动连接到MySQL 5.0数据库，加载驱动程序应改成如下语句`Class.forName("com.mysql.jdbc.Driver");`

* 连接字符串应如下格式：
  `"jdbc:mysql://服务器名或IP:3306/数据库名"`

  ```
  Connection con = 
  DriverManager.getConnection
  ("jdbc:mysql://127.0.0.1:3306/test", "root", "root"); 
  ```

  

# 网络编程

## 概念

* 协议：网络协议的简称，网络协议是通信计算机双方必须共同遵从的一组约定。如怎么样建立连接、怎么样互相识别等。只有遵守这个约定，计算机之间才能相互通信交流。它的三要素是：语法、语义、时序。
* TCP/IP四层：数据链路层 、网络层、传输层、应用层
* 套接口编程：利用传输层（TCP或UDP）实现网络进程通信的编程，这是所有应用开发的基础
* Socket：传输层提供的网络进程通信接口; 进程之间的通信的抽象连接点; 用于表达两台机器间一个连接的终端
* java.net包提供的类Socket类、ServerSocket类

## 基于TCP的Socket通讯实现

* TCP是一种可靠的、基于连接的网络协议，当两个网络进程准备基于TCP通信时，都必须首先建立各自的一个套接口：服务器建立套接口后，侦听来自网络的客户连接请求；客户通过套接口，指定服务器的IP地址和端口号，便可与服务器进行通信

* **具体实现过程**

  * 服务器：一直运行，不断监听客户端的连接
    * 创建ServerSocket对象，指定服务器监听的端口号；
    * 调用以上建立服务器套接口对象的accept方法等待客户的连接；
    * 一旦有客户送来正确请求，就连接到端口，accept方法返回一个新的套接口对象（Socket类对象）；
    * 获取该返回对象绑定的输入输出流对象，实现和客户的通信
  * 客户：主动发起连接的一方
    * 创建一个Socket类对象，指定所要连接服务器的IP地址和端口（服务器接受连接，该对象就建立）；
    * 获得该Socket对象绑定的输入输出流，实现和服务器的通信

  <img src="https://s2.loli.net/2022/01/08/rvZ7MAW61uXmf5K.png" style="zoom: 50%;" />

## 基于UDP的Socket通讯实现

* 通信前不需要预先建立连接，速度快，可靠性差；每次发送的数据独立路由，都需要加上对方的IP地址和端口．
* 支持UDP的两个主要类：DatagramSocket, DatagramPacket


# 考前教育

## Java网络编程

### 某学长

[《Java语言及网络编程》复习笔记 | ComyDream Studio](https://comydream.github.io/2019/01/04/java-review/)

### 同班同学

* 程序填空，根据一段描述写代码，根据界面写代码
* 一段代码问你输出结果（主要考察参数传递，构造函数调用顺序，类型转换）
* 指出代码中的错误（权限修饰符，super关键字）
* **简述内部类，匿名内部类设计的好处**（内部类方法可以访问该类定义所在的作用域中的数据，包括私有的数据；内部类可以对同一个包中的其他类隐藏起来；使用匿名内部类定义回调函数，节省代码）
* 线程安全的栈或队列（synchronized关键字），见上
* 输入字符串进行截取，替换等操作（java.io和java.lang.String，另外凡涉及IO都应当进行异常处理）
* 按要求存放元素（java.util.Vector , java.util.List，Java.util.Map）

### 讲师xwp

[JAVA Open EXAM Study - 须臾所学之野 (wanpengxu.github.io)](https://wanpengxu.github.io/2022/01/09/JAVA-Open-EXAM-Study/)

### 信安老师

（强调）开发环境的配置，环境变量、系统变量有哪些，它的作⽤是什么。 开发流程要知道，哪些是⽤来做编译的，哪些是⽤来启动虚拟机的，源⽂件的后缀是什么（.java）中 间字节码的后缀（.class）编译过程中我们的邮件命名，编译完成后会出现⼏个class⽂件

贯穿试卷 （⽤户）标识符命名规则 基本数据类型（数据转换） 作⽤域，初始化（⾯向对象中，声明的位置不⼀样，由谁初始化也不⼀样，在成员变量⾥，由编译器 来初始化，在形参⾥⽤形参初始化，局部变量和布尔变量由⽤户⾃⼰初始化），初始化数组(基本类型 数组初始化是基本类型的值；对象类型在数组⾥初始化的值是null,需要初始化对象来调⽤。) 运算符要知道优先级 参数传递（重点）（⽅法定义⾥必考，要知道 穿传⼀个基本数据类型，它的结果是什么样的，传⼀个 引⽤类型结果是什么样的。引⽤类型传到⽅法⾥⾯它的引⽤值可能发⽣变化，它的对象引⽤，指向性 的对象和不指向性的对象它⾥⾯的变化情况是什么）

⼤部分题都在这章 访问权限修饰符和⾮访问权限修饰符在封装时的语法（必考） 访问权限修饰符类⼀级的、成员⼀级的访问权限是不⼀样的。 ⾮访问权限修饰符（final、statick)。 继承多态 单继承 可以实现多接⼝ 向上转型问题 ⽅法调⽤时多态的概念 多态有两种实现机制：覆盖和 重载 继承通过多态实现重载 运⾏时动态链遍机制 覆盖和重载语法规则 ⽅法头⽣成的时候覆盖和重载要求的是什么样 和他的输⼊参数有没有关系 与访 问权限修饰符的关系 对象初始化顺序，成员变量和构造⽅法、对静态变量和静态块、在初始化的过程的顺序（重点） super等关键字的含义是什么，构造⽅法使⽤的规则， 掌握接⼝与抽象类的语法 Lamb表达式不考 匿名内置类实现监听器

运⾏时出现的问题，异常出现的阶段，分类 异常处理的语法规则 异常出现时有两种处理⽅法

integer包装类的使⽤⽅法，基本数据类型、字符串之间转换⽤包装类实现 范型（有很少的选择题），注意如何使⽤，使⽤时的问题 I/o 选择题 scanner ⽤法

图形怎么往⽂件放，布局管理器怎么⽤，常⻅的布局管理器有哪些。 事件处理机制（编程）编写事件监听器，安放在事件源（图⽚ 上来完成某个⼯作

构造线程的⽅法：两种 定义 线程的6态，状态之间的转换，常⻅的函数⽅法怎么⽤ 线程的同步只⽤掌握synchronized互斥

### 计科老师+同学

* **java源文件的组成**：类或外部结构，例“class Student{}”；main()方法，也叫做程序的入口；编写的代码，是写在main方法中的。
* **编译后出现几个字节码**：一个源文件有几个类就能编译出几个class，内部内也会产生

* **main方法的作用**
  * public：为了保证JVM在任何情况下都可以访问到main方法，就用public修饰
  * 静态的：可以让JVM调用main方法的时候更加方便，不需要通过对象调用。
  * 没有返回值。Java不需要main方法向操作系统返回退出信息。如果main方法正常退出，那么Java应用层序的退出代码为0，表示成功的运行了程序。
  * main的名称：不能变，是为了JVM能够识别程序运行的起点，main方法可以被重载，重载的main方法不会被执行。main方法作为程序初始线程的起点，任何其他线程均由该线程启动。
  * String [] args：是main方法中唯一可以改变的地方。args是arguments的缩写，只是一个变量默认名，习惯性写作它，但是也可以改变的，只要符合命名规则随便你写成什么。其实它是程序运行传入的一个参数组。
* `.java`文件可以没公共类，`main`可以不在公共类里，要有公共类也只能有一个公共类
* **简单工厂（静态工厂方法）：写一个乐器类，有很多子类是具体乐器，见接口笔记**

* 抽象类和接口的使用，抽象类和抽象方法的关系，见笔记
* 一个复杂对象方法的构造调用顺序，见笔记
* 泛型约束容器的类型和与普通数组的区别，见笔记
* util集合类vector，见笔记
* 几种基本的布局管理器，面板窗体默认布局管理(BorderLayout是容器JFrame和JApplet的默认布局方式,FlowLayout面板Panel和它的子类Applet的默认布局方式)，还有gridLayout见笔记
* 如何安排布局，前景色，背景色（布局f.setLayout(new xxxLayout());颜色和字体setBackground, setForeground, setFont，位置和大小setBounds, setLocation, setSize）
* 画图：画字符串\椭圆\弧\矩形，见笔记
* 常用组件按钮文本框标签，见笔记
* 事件处理，事件源监听器，见笔记
* 时间监听器的编写，能有编写处理函数addMouseListener mouseClicked MouseEvent就不要创建action的
* 加减乘除计算器
* **窗体上的鼠标单击变笑脸哭脸**，见笔记
* **用线程调用控制动画一会画椭圆一会画矩形**，见笔记
* 实现方法继承thread
* 接口runnable
* 基本方法，静态方法（currentThread() 、sleep() 、yield()、 interrupt()）

## JavaEE程序设计

### 来自老师

**填空题 10个x2分=20**

**问答题 5个x6分=30（概念，有延伸、从实现、编译的角度融入自己的思考）**

**编程题有基础和高级** 

**基础题 2个x10分=20** 

* 不得引入工具 例如队列不用queue 

  ```java
  public class QueueTest1 {  
      public static void main(String[] args){  
          //测试队列
          System.out.println("测试队列：");
          Queue queue = new Queue();  
          queue.in(1);  
          queue.in(2);  
          queue.in(3);  
          System.out.println(queue.out()); 
          System.out.println(queue.out()); 
          queue.in(4);  
          System.out.println(queue.out());  
          System.out.println(queue.out());  
          queue.in(5);  
          System.out.println(queue.out()); 
      }  
  }  
  
  //使用数组定义一个队列
  class Queue {  
      int[] a = new int[10];  
      int i = 0; //数组下标
      //入队
      public void in(int m){  a[i++] = m;} 
      //出队
      public int out(){  
         int index = 0;  
         int temp = a[1];  
         for(int j=1;j<i;j++){  
           a[j-1] = a[j];  
           index++;  
         }  
         i = index;  
         return temp;  
      }  
  }
  ```

**高级题** 

综合 建议写注释 不会也需要搭建整体的框架

* USB接口，引线数量做常量，功能数据传递和充电（接口里面写不写public final，数据都是常量）

  ```java
  interface USB {
      int lineNum = 5;
      void open();
      void trans();
      void charge();
  }
  
  class NoteBook {
      public void run() {System.out.println("computer running ...");}
      public void useUSB (USB usb) {if (usb != null) {usb.open();}}
  }
  
  class Mouse implements USB {
      public void run()  {System.out.println("mouse running ...");}
      public void open()  {System.out.println("mouseUSB open ...");}
      public void trans() {System.out.println("mouse trans " + lineNum + " lines");}
      public void charge() {System.out.println("mouse charge");}
  }
  
  class Keyboard implements USB {
      public void run()  {System.out.println("keyboard running ...");}
      public void open()  {System.out.println("keyboardUSB open ...");}
      public void trans() {System.out.println("keyboard trans "+ lineNum + " lines");}
      public void charge() {System.out.println("keyboard connot charge");}
  }
  
  class Battery implements USB {
      public void run()  {System.out.println("battery running ...");}
      public void open()  {System.out.println("battery open ...");}
      public void trans() {System.out.println("battery cannot trans");}
      public void charge() {System.out.println("battery charge");}
  }
  
  public class usbDemo {
      public static void main (String[] arg) {
          NoteBook pc = new NoteBook();
          pc.run();
          Mouse mouse = new Mouse();
          pc.useUSB(mouse);
          mouse.run();
          mouse.trans();
          Keyboard keyboard = new Keyboard();
          pc.useUSB(keyboard);
          keyboard.run();
          keyboard.trans();
          Battery battery = new Battery();
          pc.useUSB(battery);
          battery.run();
          battery.trans();
          battery.charge();
      }
  }
  //computer running ...
  //mouseUSB open ...
  //mouse running ...
  //mouse trans 5 lines
  //keyboardUSB open ...
  //keyboard running ...
  //keyboard trans 5 lines
  //battery open ...
  //battery running ...
  //battery cannot trans
  //battery charge
  ```

* 抽象类和接口 抽象方法和非抽象方法
* **参数传参和多线程一起 构造函数**
* a继承b继承c， c调用a的函数
* 线程同步互斥（协作竞争）是什么，什么时候用
* 线程中断的执行方法，如何恢复 yield wait sleep join interrupt
* socket 本机进程通信
* 捕获、抛出方式有哪些
* 什么是错误
* 数据库（url username password） 记得关闭
* 为什么要close？
* ==（地址）与equal（重写object）
* 文件管文件也管目录、绑定与关闭
* I/O流必须会 字节 system.in 字符串 buffer stringbuffer 可变 string不可变
* 参数基于拷贝 简单类(一致) 复杂类(地址) 原因 （提高数据相应效率，有常量池，降低代价）

* 排序算法

  ```java
  import java.util.Scanner;
  
  class selectSort {
      public static void sorting(int[] list){
          for(int i=0; i<list.length; i++){
              int min = list[i];
              int min_index = i;
              for(int j=i+1; j<list.length; j++){
                  if(list[j] < min){
                      min_index = j;
                      min = list[j];
                  }
              }
              int temp = list[i];
              list[i] = list[min_index];
              list[min_index] = temp;
          }
      }
  }
  
  class bubbleSort {
      public static void sorting(int[] list){
          for(int i=0; i<list.length-1; i++){
              for(int j=0; j<list.length-1-i; j++){
                  if(list[j] > list[j+1]){
                      int temp = list[j];
                      list[j] = list[j+1];
                      list[j+1] = temp;
                  }
              }
          }
      }
  }
  
  class QuickSort {
      public static void quickSort(int[] q, int l, int r) {
          if (l >= r) {return;}
          int i = l - 1, j = r + 1, x = q[l + r >> 1];
          while (i < j) {
              do i++; while (q[i] < x);
              do j--; while (q[j] > x);
              if (i < j) {int t = q[j]; q[j] = q[i]; q[i] = t;}
          }
          quickSort(q, l, j);
          quickSort(q, j + 1, r);
      }
  }
  
  public class sort extends xxxxSort {
      public static void main(String[] args){
          Scanner sc = new Scanner(System.in);
          int[] buf = new int[10];
          for (int i = 0; i < buf.length; i++) {
              buf[i] = sc.nextInt();
          }
          sorting(buf);
          //quickSort(q, 0, q.length-1);
          for (int j : buf) {System.out.print(j + " ");}
      }
  }
  ```
