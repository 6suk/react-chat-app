import fs from 'fs-extra';

const ROOT = './data/';

export const jsonUpdate = async ({ fileName, newData }) => {
  try {
    console.log(ROOT);
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
