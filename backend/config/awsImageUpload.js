const { awsBucket, awsAccessKey, awsSecretAccessKey, awsPermission } = require('./keys');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey
});

const deleteFile = (file) => {
    fs.unlink(file.path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function uploadFileToS3(file, module, user_id) {
    let promise = new Promise((resolve, reject) => {
        const params = {
            Bucket: awsBucket + '/' + module + '/' + user_id,
            Key: file.originalname,
            ContentType: file.mimetype,
            Body: fs.createReadStream(file.path),
            ACL: awsPermission
        };

        s3.upload(params, function (s3Err, resp) {
            if (s3Err) {
                console.log(s3Err);
                deleteFile(file);
                reject(s3Err);
            } else {
                imageUrl = resp.Location;
                deleteFile(file);
                resolve(resp);
            }
        });
    });
    return promise;
};

module.exports = uploadFileToS3;