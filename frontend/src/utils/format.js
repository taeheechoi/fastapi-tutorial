export const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : str)

export const getAvatarName = (user) =>
    capitalize(user?.profile?.full_name) || capitalize(user?.username) || "Anonymous"
