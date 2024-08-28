import React, { useEffect, useState } from 'react';

function RenderLogger() {
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        // 增加渲染計數
        setRenderCount(prevCount => prevCount + 1);

        // 從 localStorage 獲取現有的日誌
        const existingLog = localStorage.getItem('renderLog') || '[]';
        const logArray = JSON.parse(existingLog);

        // 添加新的日誌條目
        const newEntry = {
            timestamp: new Date().toISOString(),
            message: `Component rendered (count: ${renderCount + 1})`
        };
        logArray.push(newEntry);

        // 將更新後的日誌保存回 localStorage
        localStorage.setItem('renderLog', JSON.stringify(logArray));

        // 在控制台輸出日誌，方便調試
        console.log('Render log:', logArray);
    });

    return (
        <div>
            <h2>Render Count: {renderCount}</h2>
            <p>Check localStorage and console for render log</p>
        </div>
    );
}

export default RenderLogger;