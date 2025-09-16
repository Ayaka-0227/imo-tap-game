document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const message = document.getElementById('message');
  const chars = ['や', 'き', 'い', 'も'];
  const sequence = ['や', 'き', 'い', 'も']; // 固定順番
  let currentIndex = 0; // 現在の期待タップIndex
  let cycleCount = 0; // 成功サイクル数
  let positions = []; // 現在の文字位置
  let timeoutId = null; // 0.5秒タイマーID

  // Fisher-Yatesシャッフル
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // 文字をボックスに配置
  function setupBoxes() {
    positions = shuffle([...chars]);
    boxes.forEach((box, i) => {
      box.textContent = positions[i];
    });
  }

  // 順番を表示（3秒間隔でハイライト、初回のみ）
  function showSequence() {
    let delay = 0;
    sequence.forEach((char, i) => {
      setTimeout(() => {
        const box = Array.from(boxes).find(b => b.textContent === char);
        if (box) {
          box.style.backgroundColor = '#ff0'; // ハイライト
          setTimeout(() => { box.style.backgroundColor = '#ddd'; }, 1000);
        }
      }, delay);
      delay += 3000; // 3秒間隔
    });
    // 表示後、タップ待ち開始
    setTimeout(enableTaps, delay);
  }

  // タップイベント有効化
  function enableTaps() {
    boxes.forEach(box => {
      box.addEventListener('click', handleTap);
    });
  }

  // タップハンドラ
  function handleTap(e) {
    const tappedChar = e.target.textContent;
    if (tappedChar === sequence[currentIndex]) {
      e.target.style.backgroundColor = '#0f0'; // 正解ハイライト
      currentIndex++;

      // タイマーキャンセル
      if (timeoutId) clearTimeout(timeoutId);

      // シャッフル（即時）
      setupBoxes();

      // 全文字完了か？
      if (currentIndex === sequence.length) {
        cycleCount++;
        currentIndex = 0;
        boxes.forEach(box => box.style.backgroundColor = '#ddd'); // リセット
        if (cycleCount === 3) {
          winGame();
          return;
        }
      }

      // 次のタップまでの0.5秒タイマーセット（初タップ後から）
      if (currentIndex > 0 && currentIndex < sequence.length) {
        timeoutId = setTimeout(loseGame, 500); // 0.5秒
      }
    } else {
      loseGame();
    }
  }

  // 負け
  function loseGame() {
    message.textContent = 'You lose（失敗）';
    disableTaps();
  }

  // 勝ち
  function winGame() {
    message.textContent = 'Game Clear!';
    disableTaps();
  }

  // タップ無効化
  function disableTaps() {
    boxes.forEach(box => box.removeEventListener('click', handleTap));
    if (timeoutId) clearTimeout(timeoutId);
  }

  // ゲーム開始
  setupBoxes();
  showSequence(); // 初回表示
});