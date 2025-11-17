'use client';

import { useState } from 'react';

interface FileUploadProps {
  onUploadSuccess: (data: any) => void;
  onUploadError?: (error: string) => void;
}

export default function FileUpload({ onUploadSuccess, onUploadError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      onUploadError?.('Please upload a PDF or DOC/DOCX file');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data);
    } catch (error: any) {
      onUploadError?.(error.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        isDragging
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105'
          : 'border-gray-300 bg-gradient-to-br from-white to-gray-50 hover:border-blue-400 hover:shadow-lg'
      } ${isUploading ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInput}
        className="hidden"
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
            <p className="text-lg font-semibold text-gray-700">Uploading and parsing resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">
              Drop your resume here or click to upload
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, DOC, and DOCX files
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Choose File
            </div>
          </>
        )}
      </label>
    </div>
  );
}

