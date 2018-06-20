import Mock from "mockjs";


const dataUpdate = () => {
    return {
        data: [],
        status: "1",
        message: "操作成功"
    }
}

const dataDelete = () => {
    return {
        data: [],
        status: "1",
        message: "操作成功"
    }
}

Mock.mock("/api/index/d_crossing/dataUpdate", /post|get/i, dataUpdate);
Mock.mock("/api/index/d_crossing/dataDelete", /post|get/i, dataDelete);