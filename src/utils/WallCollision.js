export default function WallCollision(characterData,canvas) {
  let bufferLeft=2;
  let bufferRight=18;
  let bufferUp= 2;
  let bufferDown= 20;
  if (characterData.currentLocation.y + bufferDown > canvas.height || characterData.currentLocation.y - bufferUp < 0) {
    characterData.velocity.dy*=-1;
  }
  if (characterData.currentLocation.x + bufferRight > canvas.width || characterData.currentLocation.x - bufferLeft  < 0) {
    characterData.velocity.dx *= -1;
  }
}