const fs = require("fs/promises");

const spreadArrOfArr = (arr) => {
  let res = [];
  for (i of arr) {
    res.push(...i);
  }
  return res;
};

const listCatFriendsActivities = (data) => {
  const activities = data.catFriends.map((friend) => friend.activities);
  console.log(activities);
  return data;
};

const printCatFriendsNames = (data) => {
  const names = data.catFriends.map((friend) => friend.name);
  console.log(names);
  return data;
};

const printCatFriendsTotalWeight = (data) => {
  let sum = 0;
  data.catFriends.map((friend) => {
    sum += friend.weight;
  });
  console.log(`The sum of cat friends' weight is ${sum}`);
  return data;
};

const totalActivitiesOfAllCats = (data) => {
  const activities = [
    ...data.activities,
    ...spreadArrOfArr(data.catFriends.map((friend) => friend.activities)),
  ];
  console.log(activities);
  return data;
};

const addTwoMoreActivities = (data) => {
  data.catFriends.map((friend) => {
    if (["bar", "foo"].includes(friend.name)) {
      friend.activities.push("swim", "play tennis");
    }
  });
  console.log(data.catFriends);
  return data;
};

const addHeightWeight = (data) => {
  data.height = 75;
  data.weight = 30;
  return data;
};

const updateName = (data) => {
  data.name = "Fluffyy";
  return data;
};

const updateColor = (data) => {
  data.catFriends.map((friend) => {
    if (friend.name === "bar") {
      friend.furcolor = "red";
    }
  });
  console.log(data.catFriends);
  return data;
};

const processData = async () => {
  try {
    const jsonData = await fs.readFile("problem1.json", { encoding: "utf-8" });
    let data = JSON.parse(jsonData);

    data = await addHeightWeight(data);
    data = await updateName(data);
    await listCatFriendsActivities(data);
    await printCatFriendsNames(data);
    await printCatFriendsTotalWeight(data);
    await totalActivitiesOfAllCats(data);
    await addTwoMoreActivities(data);
    await updateColor(data);

    console.log(data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

processData();
