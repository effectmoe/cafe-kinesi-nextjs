'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';

const SanityStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // 簡単なテストクエリ
        const result = await client.fetch('*[0...1]{_id, _type}');
        setProjectInfo({
          projectId: client.config().projectId,
          dataset: client.config().dataset,
          hasData: result && result.length > 0
        });
        setStatus('connected');
      } catch (error) {
        console.error('Sanity connection failed:', error);
        setStatus('error');
      }
    };

    checkConnection();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'checking': return 'text-yellow-600';
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking': return '🔍';
      case 'connected': return '✅';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking': return '確認中...';
      case 'connected': return '接続済み';
      case 'error': return 'オフライン';
      default: return '不明';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <div>
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              Sanity CMS: {getStatusMessage()}
            </p>
            {projectInfo && (
              <div className="text-xs text-gray-500 mt-1">
                <p>Project: {projectInfo.projectId}</p>
                <p>Dataset: {projectInfo.dataset}</p>
                {status === 'connected' && (
                  <p className="text-green-600">✓ データベース接続正常</p>
                )}
              </div>
            )}
            {status === 'error' && (
              <p className="text-xs text-gray-500 mt-1">
                デフォルトデータを表示中
              </p>
            )}
          </div>
        </div>
        
        {status === 'connected' && (
          <div className="mt-2 pt-2 border-t">
            <a 
              href="https://cafekinesi.sanity.studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              🎛️ 管理画面を開く
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanityStatus;