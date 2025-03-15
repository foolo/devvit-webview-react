export async function getRandomNumber(): Promise<number> {
  const random_number = Math.floor(Math.random() * 100) + 1;
  console.log(`Generated random number: ${random_number}`);
  return random_number;
}
