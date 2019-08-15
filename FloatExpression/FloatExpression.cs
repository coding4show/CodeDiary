using UnityEngine;
using UnityEditor;
using Sirenix.OdinInspector.Editor;

/// <summary>
/// 浮点表达式
/// </summary>
public abstract class FloatExpression
{
    public abstract float Do();
}

/// <summary>
/// 浮点直接值
/// </summary>
public class InstantFloatExpression : FloatExpression
{
    public float value;
    public override float Do()
    {
        return value;
    }
}

/// <summary>
/// 浮点加法
/// </summary>
public class FloatAddExpress : FloatExpression
{
    public FloatExpression a;
    public FloatExpression b;
    public override float Do()
    {
        return a.Do() + b.Do();
    }
}

/// <summary>
/// 浮点减法
/// </summary>
public class FloatMinusExpress : FloatExpression
{
    public FloatExpression a;
    public FloatExpression b;
    public override float Do()
    {
        return a.Do() - b.Do();
    }
}

/// <summary>
/// 浮点乘法
/// </summary>
public class FloatMulExpress : FloatExpression
{
    public FloatExpression a;
    public FloatExpression b;
    public override float Do()
    {
        return a.Do() * b.Do();
    }
}

/// <summary>
/// 浮点除法
/// </summary>
public class FloatDivExpress : FloatExpression
{
    public FloatExpression a;
    public FloatExpression b;
    public override float Do()
    {
        return a.Do() / b.Do();
    }
}


public class ExpressionEditor : OdinEditorWindow
{
    [MenuItem("Expression/ExpressionEditor")]
    public static void ShowWindow()
    {
        EditorWindow.GetWindow<ExpressionEditor>();
    }

    public FloatExpression expression;

    protected override void OnGUI()
    {
        base.OnGUI();

        if (GUILayout.Button("Do", GUILayout.Height(20)))
        {
            if (expression != null)
            {
                Debug.Log(expression.Do().ToString());
            }
        }
    }
}
