import fs from 'fs-extra';

const ROOT = './data/';

export const jsonUpdate = async ({ fileName, newData }) => {
  try {
    const path = `${ROOT}${fileName}`;
    const buffer = await fs.readFile(path);
    const data = JSON.parse(buffer.toString());

    await fs.writeFile(path, JSON.stringify([...data, newData]));
  } catch (error) {
    console.log('🚨 JSON Update Util Error! : ', error);
    throw error;
  }
};

export const jsonRemove = async ({ fileName, newData }) => {
  try {
    const path = `${ROOT}${fileName}`;
    await fs.writeFile(path, JSON.stringify(newData));
  } catch (error) {
    console.log('🚨 JSON remove Util Error! : ', error);
    throw error;
  }
};

export const jsonGetOthersById = async ({ fileName, id }) => {
  try {
    const path = `${ROOT}${fileName}`;
    const buffer = await fs.readFile(path);
    const datas = JSON.parse(buffer.toString());
    return datas.filter(data => data.id !== id);
  } catch (error) {
    console.log('🚨 JSON GetOthers Util Error! : ', error);
    throw error;
  }
};

export const jsonGetOneById = async ({ fileName, id }) => {
  try {
    const path = `${ROOT}${fileName}`;
    const buffer = await fs.readFile(path);
    const datas = JSON.parse(buffer.toString());
    return datas.filter(data => data.id === id)[0];
  } catch (error) {
    console.log('🚨 JSON GetOne Util Error! : ', error);
    throw error;
  }
};
