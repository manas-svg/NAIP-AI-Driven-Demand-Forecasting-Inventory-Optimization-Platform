import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const DataUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      alert("Please upload a valid CSV file");
      return;
    }
    setFile(selectedFile);
    setComplete(false);
    simulateValidation();
  };

  const simulateValidation = () => {
    setSimulating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setSimulating(false);
          setComplete(true);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  const requiredColumns = ['Year', 'Month', 'Region', 'Industry', 'Application', 'Bearing_Type', 'Dealer_ID', 'Order_Quantity', 'Revenue'];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dataset Upload & Ingestion</h1>
          <p className="page-subtitle">Securely import sales and telemetry data for AI processing</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Upload Aftermarket CSV Data</h3>
          
          {/* Drag & Drop Zone */}
          <div 
            style={{ 
              border: `2px dashed ${dragActive ? 'var(--nbc-blue)' : 'var(--border-color)'}`, 
              borderRadius: '8px', 
              padding: '4rem 2rem', 
              textAlign: 'center', 
              backgroundColor: dragActive ? 'rgba(0, 58, 143, 0.05)' : 'var(--bg-color)',
              transition: 'var(--transition)',
              cursor: 'pointer',
              position: 'relative'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleChange} 
              style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0, cursor: 'pointer' }}
            />
            <UploadCloud size={48} style={{ color: 'var(--nbc-blue-light)', marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Drag & Drop CSV File Here</h4>
            <p style={{ color: 'var(--text-muted)' }}>Or click to browse from your computer</p>
          </div>

          {/* Upload Status */}
          {(file || simulating || complete) && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FileText size={24} style={{ color: 'var(--nbc-blue)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{file?.name || 'Uploading...'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{(file?.size / (1024*1024)).toFixed(2) || '0.00'} MB</div>
                </div>
                {complete && <CheckCircle size={24} style={{ color: 'var(--success)' }} />}
              </div>
              
              {simulating && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span>Validating Schema...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: 'var(--bg-color)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, backgroundColor: 'var(--nbc-blue)', height: '100%', transition: 'width 0.2s' }}></div>
                  </div>
                </div>
              )}

              {complete && (
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                    <CheckCircle size={16} /> <span>15,240 Rows Successfully Validated</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                    <CheckCircle size={16} /> <span>Data Schema Matches</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                    <AlertCircle size={16} /> <span>12 rows dropped due to missing 'Revenue' field</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button className="btn btn-primary">Process & Update Models</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Schema Requirement panel */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Required Data Schema</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Ensure your CSV contains these exact column headers for processing:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
            {requiredColumns.map((col, idx) => (
              <div key={idx} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-color)', fontSize: '0.85rem', fontWeight: 500 }}>
                {col}
              </div>
            ))}
            <div style={{ padding: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '4px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ... and 15 optional columns
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataUpload;
