// KOREA●CHINA Bridge
// 현재 페이지는 HTML/CSS 중심의 정적 버전입니다.
// 아래에서 버튼 및 인터랙션을 추가할 수 있습니다.

document.addEventListener("DOMContentLoaded", function () {

  // 시작하기 버튼
  const startButtons = document.querySelectorAll(".btn");

  startButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      console.log("YDDS / KOREA●CHINA Bridge 시작");

    });

  });


  // 언어 선택
  const languageButton = document.querySelector(".right span");

  if (languageButton) {

    languageButton.style.cursor = "pointer";

    languageButton.addEventListener("click", function () {

      alert("한국어 / 中文 언어 선택 기능입니다.");

    });

  }


  // 자세히 보기
  const moreButtons = document.querySelectorAll(".more");

  moreButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      const href = button.getAttribute("href");

      if (href === "#") {

        event.preventDefault();

        alert("해당 서비스 페이지는 준비 중입니다.");

      }

    });

  });


  // 회원가입
  const signup = document.querySelector(".signup");

  if (signup) {

    signup.addEventListener("click", function (event) {

      const href = signup.getAttribute("href");

      if (href === "#join") {

        event.preventDefault();

        alert("회원가입 페이지는 준비 중입니다.");

      }

    });

  }

});
