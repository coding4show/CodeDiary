using UnityEngine;
using System.Collections.Generic;


/// <summary>
/// 游戏的一次抽象动作;
/// 例如一次棋子移动, 一次普通攻击, 一次主动或被动技能释放;
/// 一次状态改变, 生命值增加或减少, 死亡;
/// 一次Buff的触发;
/// 游戏控制权的切换;
/// </summary>
public abstract class AbstractGameAction
{

}

/// <summary>
/// 游戏的抽象操作输入;
/// 例如一次棋子移动, 一次普通攻击, 一次主动技能释放;
/// 主动放弃本次机会?
/// </summary>
public abstract class AbstractGameInput
{

}

/// <summary>
/// 游戏的抽象类
/// </summary>
public abstract class AbstractGame
{
	/// <summary>
	/// 检查游戏是否已经结束
	/// </summary>
	public abstract bool IsEnd();

	/// <summary>
	/// 返回当前所有可能的合法操作
	/// </summary>
	public abstract AbstractGameInput[] GetValidInputs();

	/// <summary>
	/// 给游戏系统一个操作输入
	/// </summary>
	public abstract void Input(AbstractGameInput input);

	/// <summary>
	/// Update
	/// 实时的游戏需要每帧Update
	/// 回合的游戏逻辑层只要在输入, 超时等时机Update
	/// </summary>
	public abstract void Update();

	/// <summary>
	/// 游戏系统的行为输出;
	/// 游戏的行为输出主要给表现层用作显示
	/// 但是有的行为本身就是表现层的输入造成的, 不需要重复表现
	/// </summary>
	public System.Action<AbstractGameAction> OnGameAction;
}
