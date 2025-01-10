import React, { useState, useCallback } from 'react';
import { List, Space } from 'antd';
import './App.css';

function App() {
  const [items, setItems] = useState([]); // 存储任务列表
  const [newTask, setNewTask] = useState(''); // 存储输入框的值

  // 处理任务添加（按回车键）
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && newTask.trim()) { // 如果按下回车且输入框不为空
      setItems((prevItems) => [
        ...prevItems,
        { title: newTask, isCompleted: false },
      ]);
      setNewTask(''); // 清空输入框
    }
  }, [newTask]);

  // 处理任务标题编辑
  const handleInputChange = useCallback((e) => {
    setNewTask(e.target.value); // 更新输入框的内容
  }, []);

  // 删除任务
  const handleDeleteTask = useCallback((index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  }, [items]);

  // 处理任务完成状态（左键点击）
  const handleTaskClick = useCallback((index) => {
    const updatedItems = [...items];
    updatedItems[index].isCompleted = !updatedItems[index].isCompleted;
    setItems(updatedItems);
  }, [items]);

  // 右键点击删除任务
  const handleRightClick = useCallback((e, index) => {
    e.preventDefault(); // 阻止默认的右键菜单
    handleDeleteTask(index); // 删除任务
  }, [handleDeleteTask]);

  return (
    <div className="App">
      {/* 输入框部分 */}
      <input
        type="text"
        placeholder="Enter your todo"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // 按下回车时添加任务
        style={{
          marginBottom: '20px',
          width: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
        }}
      />
      
      {/* 任务列表 */}
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            onContextMenu={(e) => handleRightClick(e, index)} // 右键点击删除任务
          >
            <List.Item.Meta
              title={
                <Space>
                  <span
                    style={{
                      textDecoration: item.isCompleted ? 'line-through' : 'none', // 标记已完成的任务
                      opacity: item.isCompleted ? 0.6 : 1,
                      fontSize: '26px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTaskClick(index)} // 左键点击切换任务完成状态
                  >
                    {item.title}
                  </span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
