export const avatarGenerator = async (userId) => {

  const avatar = await fetch(`https://avatars.dicebear.com/api/miniavs/${userId}.svg?mood=happy`)
  const data = avatar.url;
  return data
}