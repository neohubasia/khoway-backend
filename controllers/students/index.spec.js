let chai = require("chai");
let expect = chai.expect;
let studentsDb = require("./index");

describe("studentsDb", () => {
  beforeEach(async () => {
    await studentsDb.dropAll();
    let howie = {
      name: "howie",
      age: 12,
      grade: 3,
      prefect: true,
    };
    let bill = {
      name: "bill",
      age: 13,
      grade: 3,
      prefect: false,
    };
    await studentsDb.addData(howie);
    await studentsDb.addData(bill);
  });

  it("drops database", async () => {
    await studentsDb.dropAll();
    let students = await studentsDb.listData();
    let input = students.length;
    let actual = 0;
    expect(input).to.equal(actual);
  });

  it("lists students", async () => {
    let input = await studentsDb.listData();
    let actual = 2;
    expect(input.length).to.equal(actual);
  });

  it("find single student by id", async () => {
    let students = await studentsDb.listData();
    let id = students[0].id;

    let student = await studentsDb.findData("id", id);
    let input = student.id;
    let actual = id;
    expect(input).to.eql(actual);
  });

  it("finds all students by property", async () => {
    let students = await studentsDb.findDataBy("grade", 3);
    let input = students.map((el) => el.name);
    let actual = ["howie", "bill"];
    expect(input).to.eql(actual);
  });

  it("inserts a student", async () => {
    let felix = {
      name: "felix",
      grade: 2,
      age: 6,
    };
    let newStudent = await studentsDb.addData(felix);
    let { id, ...input } = newStudent;
    let actual = {
      name: "felix",
      grade: 2,
      age: 6,
      prefect: false,
    };
    expect(input).to.eql(actual);
  });

  it("throws error if inserts a student with invalid payload", () => {
    let invalid = {
      name: "bill",
      grade: "INSERT POISON INTO THIS",
    };
    expect(() => {
      studentsDb.addData(invalid);
    }).to.throw("grade must be a number");
  });

  it("deletes a student", async () => {
    let students = await studentsDb.listData();
    let id = students[0].id.toString();
    let validInput = await studentsDb.deleteData(id);
    let validActual = {
      status: "success",
      id,
    };
    expect(validInput).to.eql(validActual);

    let newStudents = await studentsDb.listData();
    let inputLength = newStudents.length;
    let actualLength = 1;
    expect(inputLength).to.equal(actualLength);

    let invalidInput = await studentsDb.deleteData(42);
    let invalidActual = {
      status: "fail",
    };
    expect(invalidInput).to.eql(invalidActual);
  });
});
