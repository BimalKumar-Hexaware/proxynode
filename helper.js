const request = require('request'),
    config = require('./config');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
    "getClaimStatus": function (claimId) {
        var speechOutput = [];
        console.log('InsideHelper Claim Id:', claimId);
        return new Promise(function (resolve, reject) {
            if (claimId == "000-00-006906") {
                speechOutput = ["<s>According to our records, the current status of claim with ID <break strength=\"medium\" /> <say-as interpret-as=\"digits\"> " + claimId + " </say-as>, is Processed.</s>"];
            } else if (claimId == "000-00-006903") {
                speechOutput = ["<s>According to our records, the current status of claim with ID <break strength=\"medium\" /> <say-as interpret-as=\"digits\"> " + claimId + " </say-as>, is On Hold.</s>"];
                speechOutput.push('<s>The reason for the same is <break strength=\"medium\" />Documents Pending from Insured.</s>');
            } else if (claimId == "000-00-007006") {
                speechOutput = ["<s>According to our records, the current status of claim with ID <break strength=\"medium\" /> <say-as interpret-as=\"digits\"> " + claimId + " </say-as>, is Cleared.</s>"];
            } else {
                speechOutput = ['<s>The claim number is not found.</s><s>Please enter a valid one</s>'];
            }
            resolve(speechOutput);
        })
    },
    "getClaimPaymentDetails": function (claimId) {
        console.log('inside getClaimPaymentDetails');
        var speechOutput = [];
        return new Promise(function (resolve, reject) {
            var options = {
                method: 'POST',
                url: config.claimStatusApiURL,
                headers: { authorization: 'Basic c3U6Z3c=', 'content-type': 'application/json' },
                body: { jsonrpc: '2.0', method: 'getClaimPaymentDetails', params: [claimId] },
                json: true
            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    speechOutput = ["<s>Something went wrong.</s><s> Please try again</s>"];
                    resolve(speechOutput);
                }
                console.log(body);
                resolve(body.result);
            });
        });
    },
    "getRentalCarStatus": function (claimId) {
        var speechOutput = [];
        console.log('InsideHelper Claim Id:', claimId);
        return new Promise(function (resolve, reject) {
            if (claimId == "000-00-000604") {
                var rentStartDate = new Date("2018-04-26T00:00:00Z");
                console.log('rentstartdate', rentStartDate);
                var month = months[rentStartDate.getMonth()];
                speechOutput = ['<s> The car has been booked with the Rental agency <break strength=\"medium\" /> Enterprise <break time="200ms"/> and the reservation number is <break time="200ms"/> <say-as interpret-as=\"spell-out\">0001706</say-as>. </s>'];
                speechOutput.push('<s> The car will be delivered on ' + month + '<say-as interpret-as="ordinal">' + rentStartDate.getDate() + '</say-as> at <break time="150ms"/> 9AM</s>');
            } else if (claimId == "000-00-000203" || claimId == "000-00-000303") {
                speechOutput = ['<s> The Rental car has not been booked yet as the option was not selected when the claim was created.</s>'];
                speechOutput.push('<s> <break strength=\"medium\" /> Do you want to book one? </s>');
            } else {
                speechOutput = ['<s>The claim number is not found.</s><s>Please enter a valid one</s>'];
            }
            resolve(speechOutput);
        })
    },
    "getRentalConfirmation": function (claimId, rentalStartDate, rentalDays) {
        var speechOutput = [];
        return new Promise(function (resolve, reject) {
            rentalDays = rentalDays.match(/\d+/)[0];
            var startDate = new Date(rentalStartDate);
            rentalStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
            console.log('Claim Id', claimId);
            console.log('rentalstartDate', rentalStartDate);
            console.log('RentalDays', rentalDays);


            var rentStartDate = new Date("2018-04-26T00:00:00Z");
            console.log('rentstartdate', rentStartDate);
            var month = months[rentStartDate.getMonth()];
            speechOutput = ['<s> Let me help with your booking.<break time="2s"/>  </s>'];
            speechOutput.push('<s> The car has been booked with the Rental agency <break strength=\"medium\" /> Enterprise <break time="200ms"/> and the reservation number is <break time="200ms"/> <say-as interpret-as=\"spell-out\">0001803</say-as>. </s>');
            speechOutput.push('<s> The car will be delivered on ' + month + '<say-as interpret-as="ordinal">' + rentStartDate.getDate() + '</say-as> at <break time="150ms"/> 9AM</s>');
            resolve(speechOutput);
        })
    },
    "getClaimStatusGerman": function (claimId) {
        var speechOutput = [];
        console.log('InsideHelper Claim Id:', claimId);
        return new Promise(function (resolve, reject) {
            var options = {
                method: 'POST',
                url: config.claimStatusApiURL,
                headers: { 'cache-control': 'no-cache', authorization: 'Basic c3U6Z3c=', 'content-type': 'application/json' },
                body: { jsonrpc: '2.0', method: 'getClaimSummary', params: [claimId] },
                json: true
            };
            request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                    speechOutput = ["<s>Etwas ist schief gelaufen.</s><s> Bitte versuche es erneut</s>"];
                    resolve(speechOutput);
                } else {
                    if (body.error) {
                        console.log('Inside body error', body.error.message);
                        if (body.error.message == 'No Claim entity found')
                            speechOutput = ['<s>Die Anspruchsnummer wird nicht gefunden.</s><s>Bitte geben Sie einen gültigen ein</s>'];
                    } else {
                        if (body.result.currentClaimStatus === "On Hold") {
                            speechOutput = ["<s>Nach unseren Aufzeichnungen, der aktuelle Status des Anspruchs mit ID <break strength=\"medium\" /> <say-as interpret-as=\"digits\"> " + claimId + " </say-as>, in Wartestellung.</s>"];
                            //speechOutput.push('<s>The reason for the same is <break strength=\"medium\" />' + body.result.reason + '.</s>');
                        }
                        if (body.result.currentClaimStatus === "Processed") {
                            speechOutput = ["<s>Nach unseren Aufzeichnungen, der aktuelle Status des Anspruchs mit ID <break strength=\"medium\" /> <say-as interpret-as=\"digits\"> " + claimId + " </say-as>,wird verarbeitet.</s>"];
                            //speechOutput.push('<s>The reason for the same is <break strength=\"medium\" />' + body.result.reason + '.</s>');
                        }
                    }
                    console.log(speechOutput);
                    resolve(speechOutput);
                }
            });
        })
    }
};

