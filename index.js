const fetch = require('node-fetch').default;

const GET_URL = "https://apilos.cynclosdemo.net/loan/v2/loanrequests?loanType=inprocess&type=loan";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Inh5eiIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwidXNlcklkIjoxMDE2LCJ1c2VybmFtZSI6MTAxNiwibGFzdExvZ2luIjoiMjAyMi0wNy0yN1QxOToxNToxNi4wMDBaIiwicGVybWlzc2lvbnMiOlsiY3JlYXRlX3VzZXIiLCJlZGl0X3VzZXJzIiwibGlzdF9yb2xlcyIsImNyZWF0ZV9yb2xlIiwiZWRpdF9yb2xlcyIsImRlbGV0ZV9yb2xlcyIsImxpc3RfcGVybWlzc2lvbnMiLCJjcmVhdGVfZW50aXR5Iiwidmlld19lbnRpdGllcyIsImVkaXRfZW50aXR5IiwiZGVsZXRlX2VudGl0eSIsImNyZWF0ZV9yZWxhdGlvbnNoaXAiLCJ2aWV3X3JlbGF0aW9uc2hpcHMiLCJlZGl0X3JlbGF0aW9uc2hpcCIsImRlbGV0ZV9yZWxhdGlvbnNoaXAiLCJjcmVhdGVfY3VzdG9tX3RlbXBsYXRlIiwidmlld19jdXN0b21fdGVtcGxhdGUiLCJlZGl0X2N1c3RvbV90ZW1wbGF0ZSIsImRlbGV0ZV9jdXN0b21fdGVtcGxhdGUiLCJhc3NpZ25fdGVtcGxhdGUiLCJ2aWV3X3NwcmVhZHMiLCJlZGl0X3NwcmVhZHMiLCJjcmVhdGVfcGVyaW9kIiwiZWRpdF9wZXJpb2QiLCJkZWxldGVfcGVyaW9kIiwiZXhwb3J0X3NwcmVhZHMiLCJjcmVhdGVfZGVidHMiLCJ2aWV3X2RlYnRzIiwiZWRpdF9kZWJ0cyIsImRlbGV0ZV9kZWJ0cyIsImNyZWF0ZV9jb21tZW50Iiwidmlld19jb21tZW50cyIsImVkaXRfY29tbWVudHMiLCJkZWxldGVfY29tbWVudHMiLCJycl9jcmVhdGVfZ3JvdXAiLCJycl92aWV3X2dyb3VwcyIsInJyX2VkaXRfZ3JvdXAiLCJycl9kZWxldGVfZ3JvdXAiLCJycl9jcmVhdGVfYXR0cmlidXRlIiwicnJfdmlld19hdHRyaWJ1dGVzIiwicnJfZWRpdF9hdHRyaWJ1dGUiLCJycl9kZWxldGVfYXR0cmlidXRlIiwicnJfZGVmaW5lX2NhbGN1bGF0aW9uX2xvZ2ljIiwicnJfdmlld19jYWxjdWxhdGlvbl9sb2dpYyIsInJyX2VkaXRfY2FsY3VsYXRpb25fbG9naWMiLCJycl9kZWxldGVfY2FsY3VsYXRpb25fbG9naWMiLCJycl9jcmVhdGVfc2NvcmUiLCJycl92aWV3X3Njb3JlIiwicnJfZWRpdF9zY29yZSIsInJyX2RlbGV0ZV9zY29yZSIsInJyX2NyZWF0ZV9tb2RlbCIsInJyX3ZpZXdfbW9kZWwiLCJycl9lZGl0X21vZGVsIiwicnJfb3ZlcnJpZGVfbW9kZWwiLCJycl9hcmNoaXZlX21vZGVsIiwicnJfZGVsZXRlX21vZGVsIiwicnJfb3ZlcnJpZGVfc2NvcmUiLCJmbV91ZiIsImZtX3ZmIiwiZm1fZHdmIiwiZm1fZGYiLCJ2aWV3X2xvYW5waXBlbGluZSIsImFzc2lnbl91c2VyX2xvYW5waXBlbGluZSIsInJlbW92ZV91c2VyX2xvYW5waXBlbGluZSIsInNwX21wX2NyIiwic3BfbXBfZXQiLCJzcF9tcF9kdCIsImNyZWF0ZV9yZXF1ZXN0IiwiZWRpdF9yZXF1ZXN0IiwiZGVsZXRlX3JlcXVlc3QiLCJ3aXRoZHJhd19yZXF1ZXN0IiwiY3JlYXRlX2JvcnJvd2luZ19zdHJ1Y3R1cmUiLCJ2aWV3X2JvcnJvd2luZ19zdHJ1Y3R1cmUiLCJlZGl0X2JvcnJvd2luZ19zdHJ1Y3R1cmUiLCJkZWxldGVfYm9ycm93aW5nX3N0cnVjdHVyZSIsImNyZWF0ZV9mZWVzIiwidmlld19mZWVzIiwiZWRpdF9mZWVzIiwiZGVsZXRlX2ZlZXMiLCJjdl92YyIsImN2X2NjIiwiY3ZfZWMiLCJjdl9kYyIsImN2X3ZzIiwiY3ZfY3MiLCJjdl9lcyIsImN2X2RzIiwiY3ZfdmUiLCJjdl9jZSIsImN2X2VlIiwiY3ZfZGUiLCJjdl9lY2UiLCJ2aWV3X3dpdGhkcmF3IiwiZWRpdF93aXRoZHJhdyIsInJlYWN0aXZhdGVfcmVxdWVzdCIsImNvbGxfY3JlYXRlX3N1Yl90eXBlIiwiY29sbF92aWV3X3N1Yl90eXBlIiwiY29sbF9lZGl0X3N1Yl90eXBlIiwiY29sbF9kZWxldGVfc3ViX3R5cGUiLCJjb2xsX2NyZWF0ZV9yZWNvcmQiLCJ2aWV3X2FwcHJvdmVyIiwiY3JlYXRlX2FwcHJvdmVyIiwiZWRpdF9hcHByb3ZlciIsImRlbGV0ZV9hcHByb3ZlciIsImNvbGxfdmlld19yZWNvcmQiLCJjb2xsX2VkaXRfcmVjb3JkIiwiY29sbF9kZWxldGVfcmVjb3JkIiwiY29sbF9jcmVhdGVfcGxlZGdlIiwiY29sbF9lZGl0X3BsZWRnZSIsImNvbGxfZGVsZXRlX3BsZWRnZSIsImNvbGxfdmlld19wbGVkZ2UiLCJ2aWV3X2V4cG9zdXJlIiwiZWRpdF9leHBvc3VyZSIsImVtZXJnZW5jeV9sb2FuX2RlY2lzaW9uIiwidmlld19hcHByb3ZhbF93b3JrZmxvdyIsImNyZWF0ZV9hcHByb3ZhbF93b3JrZmxvdyIsImVkaXRfYXBwcm92YWxfd29ya2Zsb3ciLCJkZWxldGVfYXBwcm92YWxfd29ya2Zsb3ciLCJsY192dyIsImxjX2NyIiwibGNfZWQiLCJsY19kbCIsImV4X2NzIiwiZXhfdnMiLCJleF9lcyIsImV4X2RzIiwiZXhfY2UiLCJleF92ZSIsImV4X2VlIiwiZXhfZGUiLCJzcF9jY3IiLCJzcF92Y3IiLCJzcF9lY3IiLCJzcF9kY3IiLCJ2aWV3X3VzZXJzIiwidmlld19yb2xlcyIsInJyX3ZpZXdfdGVtcGxhdGVzIiwicnJfY3JlYXRlX3RlbXBsYXRlIiwicnJfZWRpdF90ZW1wbGF0ZSIsInJyX2RlbGV0ZV90ZW1wbGF0ZSIsInJyX2NjIiwicnJfdmMiLCJycl91YyIsInJyX2RjIiwiY21fY3QiLCJjbV92dCIsImNtX2V0IiwiY21fZHQiLCJjYV9jdCIsImNhX3Z0IiwiY2FfZXQiLCJjYV9kdCIsImNhX2NhIiwiY2FfdmEiLCJjYV9lYSIsImNhX2RhIiwiY2FfY2YiLCJjYV92ZiIsImNhX2VmIiwiY2FfZGYiLCJjYV9jZyIsImNhX3ZnIiwiY2FfZWciLCJjYV9kZyIsImNhX2NtIiwiY2Ffdm0iLCJjYV9lbSIsImNhX2RtIiwiY2FfY2MiLCJjYV92YyIsImNhX2VjIiwiY2FfZGMiLCJsY191cF9zdGciLCJsY19zYl9hcHIiLCJmbV9jZCIsImZtX3ZkIiwiZm1fZWQiLCJmbV9kZCIsInVuX3VzIiwiY2FfbG0iLCJjcnBfY3IiLCJuZl9lZF9wciIsImxuX3Z0cCIsImxuX2N0cCIsImxuX2R0cCIsImxuX2V0cCIsImxuX2hzdCIsImZtX2FmIiwiZm1fcmYiLCJmbV92ZnkiLCJmbV9ldWYiLCJmbV9lZHdmIiwiZm1fZXZmIiwiZm1fZWRmIiwidmlld19yZXF1ZXN0Iiwic3BfcmNfY2NyIiwic3BfcmNfdmNyIiwic3BfcmNfZWNyIiwic3BfcmNfZGNyIiwibG5fY28iLCJsbl9lbyIsInNwX2xwX3Z3Iiwic3BfbHBfZXQiLCJjbV9jbSIsImNtX3ZtIiwiY21fZW0iLCJjbV9kbSIsImVuX3Z3X2NwciIsImVuX3Z3X3dpX3NnIiwiZW5fY3Jfd2lfc2ciLCJlbl9lZF93aV9zZyIsImVuX2R0X3dpX3NnIiwiZW5fYXBfd2kiLCJjZHRfdnciLCJzcF9ybWFfY3IiLCJzcF9ybWFfdnciLCJzcF9ybWFfZWQiLCJzcF9ybWFfZHQiLCJhZF90bV9jciIsImFkX3RtX2VkIiwiYWRfdG1fdnciLCJ2aWV3X215ZGF0YSIsImxpc3RfdXNlcnMiLCJjYV9sdCIsImxpc3RfZW50aXRpZXMiLCJsaXN0X2N1c3RvbV90ZW1wbGF0ZXMiXSwiaWF0IjoxNjU4OTQ5MzE3LCJleHAiOjI2NTg5NTAyMTUsImlzcyI6ImN5bmMtbG9zIn0.Cyx0gzjOu7kI5WavJC4BgRIqUijM_vMKnhud3lh4Yng"
const NUMBER_OF_ATTEMPTS = 5;

const serverIntegration = async (url, payload, JWT) => {

    const response =  await fetch(url,{ method: 'GET', headers : { 'Authorization': JWT } })
        .then(response => response.json() )
        .catch( (err) => console.error(err) );

    console.log('response =>');
    return response;
}

new Array(NUMBER_OF_ATTEMPTS).fill(0).forEach(each => {
    serverIntegration(GET_URL, {}, TOKEN )
})