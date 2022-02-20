const STUDENTS = require("../../../db/memory/students"); // DB
const serialize = require("./serializer"); // serializer custom to db

const listData = () => {
  return Promise.resolve(serialize(STUDENTS));
};

const findData = (prop, val) => {
  if (prop === "id") {
    prop = "serial";
  }
  const student = STUDENTS.find((student) => student[prop] == val);
  return Promise.resolve(serialize(student));
};

const findDataBy = (prop, val) => {
  if (prop === "grade") {
    prop = "year";
  }
  const student = STUDENTS.filter((student) => student[prop] == val);
  return Promise.resolve(serialize(student));
};

const addData = (studentInfo) => {
  STUDENTS.push(studentInfo);
  return findData("serial", newStudent.serial);
};

const deleteData = (id) => {
  return findData({ id }).then((student) => {
    if (student.id == id) {
      STUDENTS = STUDENTS.filter((student) => student.serial != id);
      return {
        id,
        status: "success",
      };
    }
    return {
      status: "fail",
    };
  });
};

const dropAll = () => {
  STUDENTS = [];
  return STUDENTS;
};

module.exports = {
  listData,
  findData,
  findDataBy,
  addData,
  deleteData,
  dropAll,
};
