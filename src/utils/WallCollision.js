export default function WallCollision(character,canvas) {
  let bufferLeft=2;
  let bufferRight=18;
  let bufferUp= 2;
  let bufferDown= 20;
  if (character.y + bufferDown > canvas.height || character.y - bufferUp < 0) {
    character.dy*=-1;
  }
  if (character.x + bufferRight > canvas.width || character.x - bufferLeft  < 0) {
    character.dx *= -1;
  }
}