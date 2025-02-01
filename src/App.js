import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleNewProject = () => {
    setShowNewProjectForm(true);
  };

  const handleHomeClick = () => {
    setShowNewProjectForm(false);  // 새 프로젝트 폼 숨기기
    setIsSideMenuOpen(false);      // 사이드 메뉴 닫기
  };

  return (
    <div className="app-container">
      {/* 사이드 메뉴 */}
      <div className={`side-menu ${isSideMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <span className="material-icons close-icon" onClick={toggleSideMenu}>close</span>
        </div>
        <div className="menu-items">
          <div className="menu-item">
            <span className="material-icons">person</span>
            계정 정보 변경
          </div>
          <div className="menu-item">
            <span className="material-icons">logout</span>
            로그아웃
          </div>
        </div>
      </div>

      <header className="app-header">
        <span className="material-icons menu-icon" onClick={toggleSideMenu}>menu</span>
        <h1 onClick={handleHomeClick} style={{ cursor: 'pointer' }}>WebIDE Title</h1>
      </header>

      <div className="main-container">
        {showNewProjectForm ? (
          <div className="new-project-form-container">
            <div className="new-project-form">
              <h2>프로젝트 생성</h2>
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="프로젝트 이름을 입력하세요" />
                <p className="error-text">필수 항목입니다.</p>
              </div>
              <div className="form-group">
                <label>설명</label>
                <input type="text" placeholder="프로젝트 설명을 입력하세요" />
                <p className="error-text">필수 항목입니다.</p>
              </div>
              <div className="form-group">
                <label>프로그래밍 언어</label>
                <select>
                  <option value="">Select an option</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <p className="error-text">필수 항목입니다.</p>
              </div>
              <div className="form-group">
                <label>추가 설명</label>
                <textarea placeholder="Type your message here"></textarea>
              </div>
              <button className="submit-button">생성</button>
            </div>
          </div>
        ) : (
          <div className="projects-container">
            <div className="project-card">
              <div className="project-content">
                <div className="project-image" style={{background: 'linear-gradient(45deg, #FF6B6B, #845EC2)'}}>
                  <h3>My Project 1</h3>
                </div>
                <div className="project-info">
                  <div className="project-details">
                    <p className="label">생성 날짜</p>
                    <p className="date">1970년 1월 1일 00:00:00</p>
                    
                    <p className="label">마지막 실행 날짜</p>
                    <p className="date">1970년 1월 1일 00:00:00</p>
                    
                    <p className="label">프로젝트 설명</p>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...</p>
                  </div>
                  <button className="continue-button">Continue</button>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-content">
                <div className="project-image" style={{background: 'linear-gradient(45deg, #4B7BE5, #3490DE)'}}>
                  <h3>My Project 2</h3>
                </div>
                <div className="project-info">
                  <div className="project-details">
                    <p className="label">생성 날짜</p>
                    <p className="date">1970년 1월 1일 00:00:00</p>
                    
                    <p className="label">마지막 실행 날짜</p>
                    <p className="date">1970년 1월 1일 00:00:00</p>
                    
                    <p className="label">프로젝트 설명</p>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...</p>
                  </div>
                  <button className="continue-button">Continue</button>
                </div>
              </div>
            </div>

            <button className="new-project-button" onClick={handleNewProject}>
              새 프로젝트 생성
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
