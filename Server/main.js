//********************************* imports files and packages ****************************************


const WebSocket = require('ws');
let server_connection = require('./server_conn');
const read_Asthma_Content = require('./Read_Asthma_Content_File');
const Group = require('./Group');
const Message = require('./Message');
const axios = require('axios');
const bodyParser = require('body-parser');
server_connection.use(bodyParser.json());
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { stringify } = require('querystring');
server_connection.use(express.json());
const Social = require('./Social');
const Liked = require('./Liked');
const User = require('./User');
const Password = require('./Password');
const Comment = require('./Comment');
const Weather = require('./Weather');
const Inhaler = require('./Inhaler');
const Assessment = require('./Assessment');
const Triggers = require('./Triggers');
const Diary = require('./Diary');
const api_call_controller = require('./API_Call_Conteoller'); 



//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Diary *************************************************


server_connection.post('/get_user_Notes', async (req, res) => {
    let User_ID = req.body.userID;
    try{
        Diary.getDiaryNotes(User_ID)
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
            res.send('');
        })
    }
    catch(error){
        console.log(error);
        res.send('');
    }
})





server_connection.post('/add_user_Notes', async (req, res) => {
    let User_ID = req.body.userID;
    let title = req.body.title;
    let content = req.body.content;
    try{
        Diary.addNoteToDiary(User_ID, title, content)
        .then((response) => {
            if(response === 'Done') {
                console.log("Done 2");
                res.send('Done');
            }
            else{
                console.log("Nope 2");
                res.send('Nope');
            }
        })
        .catch((error) => {
            console.log(error);
            res.send('Nope');
        })

    }
    catch(error) {
        console.log(error);
        res.send('Nope');
    }
})







//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Profile *************************************************


server_connection.post('/get_User_All_Details', async (req, res) => {
    let User_ID = req.body.userID;
  
    try {
      User.getAllDetails(User_ID)
        .then((result) => {
          console.log('===========================================================================================');
          console.log(result, '\n ==========================================================');
          res.send(result);
        })
        .catch((error) => {
          console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          console.log("Error from calling getAllDetails function then.");
          res.send('');
        });
    } catch (error) {
      console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      console.log("Error from calling getAllDetails function then.");
      res.send('');
    }
  });
  




server_connection.post('/get_User_All_Triggers_Details', async(req, res) => {
    let User_ID = req.body.userID;

    try{
        Triggers.getTriggersList(User_ID)
        .then((result) => {
            console.log( '===========================================================================================');
            console.log(result, '\n ==========================================================');
            res.send(result);
        })
        .catch((error) => {
            console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log("Error from calling getTriggersList function then.");
            res.send('');
        })
    }
    catch(error) {
        console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log("Error from calling getTriggersList function then.");
        res.send('');
    }
});



server_connection.post('/update_user_details', (req, res) => {
    let User_ID = req.body.userID;
    let {
        user_name: User_name,
        DOB: User_DOB,
        email: User_Email,
        address: User_Address,
        medicalCondition_detail: User_M_Condition,
      } = req.body.userData;
      let User_Triggers = req.body.selectedTriggers;
      

    try{
        User.updateDetails(User_ID, User_name, User_DOB, User_Email, User_Address, User_M_Condition, User_Triggers)
        .then((response) => {
            if(response === 'Done') {
                console.log("Done 2");
                res.send('Done');
            }
            else{
                console.log("Nope 2");
                res.send('Nope');
            }
        })
        .catch((error) => {
            console.log(error);
            res.send('Nope');
        })

    }
    catch(error) {
        console.log(error);
        res.send('Nope');
    }

})




server_connection.post('/update_new_password', (req, res) => {
    let User_ID = req.body.userID;
    let User_oldPass = req.body.current;
    let User_newPass = req.body.newPassword;

    try{
        Password.ChangePassword(User_ID, User_oldPass, User_newPass)
        .then((response) => {
            if(response === 'Done') {
                console.log("Done 2");
                res.send('Done');
            }
            else{
                console.log("Nope 2");
                res.send('Nope');
            }
        })
        .catch((error) => {
            console.log(error);
            res.send('Nope');
        })
    }
    catch(error) {
        console.log(error);
        res.send('Nope');
    }

})



//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Assessment *************************************************

server_connection.post('/add_assessment', async(req, res) => {
    let User_ID = req.body.userID;
    let assessment_Score = req.body.result;
    let assessment_Condition = req.body.condition;

    try {
        Assessment.addAssessment(User_ID, assessment_Score, assessment_Condition)
        .then((result) => {
            console.log( '===========================================================================================');
            console.log(result, '\n ==========================================================');
            res.send('successful');
        })
        .catch((error) => {
            console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log("Error from calling addAssessment function then.");
            res.send('unsuccessful');
        })
    }
    catch(error) {
        console.log(error, ' ##############################################');
        console.log("Error from calling addAssessment function try.");
        res.send('unsuccessful');
    }
});



server_connection.post('/get_Assessment_Details', async(req, res) => {
    let User_ID = req.body.userID;

    try{
        Assessment.getAssessmentDetailsByUserID(User_ID)
        .then((result) => {
            console.log( '===========================================================================================');
            console.log(result, '\n ==========================================================');
            res.send(result);
        })
        .catch((error) => {
            console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log("Error from calling getAssessmentDetailsByUserID function then.");
            res.send('');
        })
    }
    catch(error) {
        console.log(error, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log("Error from calling getAssessmentDetailsByUserID function then.");
        res.send('');
    }
});


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Inhaler *************************************************

server_connection.post('/inhaler_info_display', async(req, res) => {
    let User_ID = req.body.userID;

    try{
        Inhaler.getUserInhalerInfo(User_ID)
        .then((result) => {
            console.log( '===========================================================================================');
            console.log(result, '\n ==========================================================');
            res.send(result);
        })
        .catch((err) => {
            console.log(err, ' 4$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log("Error from calling getUserInhalerInfo function then.");
            res.send('');
        })

    }
    catch(error){
        console.log(error, ' ##############################################');
        console.log("Error from calling getUserInhalerInfo function try.");
        res.send('');
    }
});






server_connection.post('/add_inhaler', async(req, res) => {
    let User_ID = req.body.userID;
    let Inhaler_Name = req.body.Inhaler_Name;
    let Type = req.body.Type;
    let Expiry_Date = req.body.Expiry_Date;
    let Num_of_Puffs = req.body.Num_of_Puffs;
    let Puffs_Per_Day = req.body.Puffs_Per_Day;

    try{
        Inhaler.addInhaler(User_ID, Inhaler_Name, Type, Expiry_Date, Num_of_Puffs, Puffs_Per_Day)
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            console.log("Error from calling addInhaler function then.")
        })

    }
    catch(error){
        console.log(error);
        console.log("Error from calling addInhaler function try.")
    }
});




server_connection.post('/add_Puff', async(req, res) => {
    let User_ID = req.body.userID;
    let Inhaler_ID = req.body.Inhaler_ID;
    const puff = 1;

    try{
    Inhaler.addPuff(User_ID, Inhaler_ID, puff)
    .then((response) => {
        if (response === 'done') {
            try{
                Inhaler.getPuffDetailsForHome(User_ID)
                .then((userPuffData) => {
                    res.send(userPuffData);
                })
                .catch((err) => {
                    console.log(err);
                    console.log("Error from calling getPuffDetailsForHome function try.")
                })
                }
                catch(err) {
                    console.log(err);
                    console.log("Error from calling getPuffDetailsForHome function try.")
                }
        }
        else res.send('');
    })
    .catch((err) => {
        console.log(err);
        console.log("Error from calling addPuff function try.")
    })
    }
    catch(err) {
        console.log(err);
        console.log("Error from calling addPuff function try.")
    }
})



server_connection.post('/remove_Puff', async(req, res) => {
    let User_ID = req.body.userID;
    let Inhaler_ID = req.body.Inhaler_ID;
    const puff = 1;

    try{
    Inhaler.removePuff(User_ID, Inhaler_ID, puff)
    .then((response) => {
        if (response === 'done') {
            try{
                Inhaler.getPuffDetailsForHome(User_ID)
                .then((userPuffData) => {
                    res.send(userPuffData);
                })
                .catch((err) => {
                    console.log(err);
                    console.log("Error from calling getPuffDetailsForHome function try.")
                })
                }
                catch(err) {
                    console.log(err);
                    console.log("Error from calling getPuffDetailsForHome function try.")
                }
        }
        else res.send('');
    })
    .catch((err) => {
        console.log(err);
        console.log("Error from calling removePuff function try.")
    })
    }
    catch(err) {
        console.log(err);
        console.log("Error from calling removePuff function try.")
    }
})



server_connection.post('/user_puff_details', async(req, res) => {
    let User_ID = req.body.userID;


    try{
    Inhaler.getPuffDetailsForHome(User_ID)
    .then((response) => {
        res.send(response);
    })
    .catch((err) => {
        console.log(err);
        console.log("Error from calling getPuffDetailsForHome function try.")
    })
    }
    catch(err) {
        console.log(err);
        console.log("Error from calling getPuffDetailsForHome function try.")
    }
})




//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Social *************************************************
let temp_send_data = '';
server_connection.get('/Social_posts', async(req, res) => {
    try {
        temp_send_data = '';
        temp_send_data = await Social.getPostDetails();
        res.json(temp_send_data);
        temp_send_data = '';
    }catch(error) {
        console.log(error);
    }
});


server_connection.post('/myPostList', (req, res) => {
    let userID = req.body.userID;
    Social.getMyPostDetails(userID)
    .then(myPostList => {
        res.send(myPostList);
        console.log(myPostList);
    })
});


server_connection.post('/addNewPost', (req, res) => {
    const { user_ID, postContent } = req.body;

    console.log(req.body);
  
    Social.addMyPost(user_ID, postContent)
      .then(() => {
        res.send('Comment successfully added.')
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  });


server_connection.post('/postLikedList', (req, res) => {
    let userID = req.body.userID;
    Liked.getPostLikedID(userID)
    .then(likedList => {
        res.send(likedList);
        console.log(likedList, ' from B');
    })

});


server_connection.post('/postLike', (req, res) => {
    let post_ID = req.body.postID;
    let liked = req.body.liked;
    let user_ID = req.body.user_ID;

    console.log(post_ID);
    if (liked) {
        Social.updateLikesPlus(user_ID, post_ID)
        .then(newLikes => {
            console.log('New likes count:', newLikes);
            res.send({ likes: newLikes });
          })
          .catch(error => {
            console.error('Error updating likes:', error);
            res.sendStatus(500);
          });
    }
    else {
        Social.updateLikesMin(user_ID, post_ID)
        .then(newLikes => {
            console.log('New likes count:', newLikes);
            res.send({ likes: newLikes });
          })
          .catch(error => {
            console.error('Error updating likes:', error);
            res.sendStatus(500);
          });
    }
});



server_connection.post('/userComment', (req, res) => {
    const { userID, postID, comment } = req.body;

    console.log(req.body);
  
    Comment.addComment(userID, comment, postID)
      .then(() => {
        res.send('Comment successfully added.')
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  });
  


server_connection.post('/Social_post_Comment', async(req, res) => {
    try {
        let post_ID = req.body.postID;
        console.log("from 1: ", post_ID);
        Comment.getAllCommentByPost(post_ID)
        .then(result => {
            res.send(result);
            console.log(result);
        })
        .catch((call_error) => {
            console.log(call_error);
            console.log("try error from call function");
        });
    }
    catch(error){
        console.log(Social_post_Comment);
    }
});

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------



//*************************************** Message and Connection *************************************************


// // Group.getUserJoinedGroups('123456').then((groups) => {
// //     console.log(groups);
// // }).catch((err) => {
// //     console.error(err);
// // });

// // Group.getNotJoinedGroups('12345678').then((groups) => {
// //     console.log(groups);
// // }).catch((err) => {
// //     console.error(err);
// // });
// let userID = '';

// server_connection.post('/send_userID_from_Message_Dashboard', (req, res) => {
//     try {
//         userID = req.body.userID;
//         console.log(userID);
//         res.send('Received user ID: ' + userID);
//         Message.sendLastMessage(userID);
//     }
//     catch (post_error) {
//         console.log(post_error);
//     }
// });



//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//*************************************************** Health Education Content ***************************************************


const dirPath = path.join('./Health_education_content');
server_connection.get('/education_cont', (req, res) => {
    const files = fs.readdirSync(dirPath);
    const education_content = files.map(file => {
      const filePath = path.join(dirPath, file);
      const fileData = fs.readFileSync(filePath, 'utf-8').split('\n');
      const title = fileData[0].trim();
      const description = fileData[1].trim();
      const image = fileData[2].trim();
      const link = fileData[3].trim();
      const content = fileData.slice(4).join('\n').trim();
      const stats = fs.statSync(filePath);
      const date = stats.mtime.toLocaleDateString();
      const time = stats.mtime.toLocaleTimeString();
      console.log(title, '\n',description, '\n',image, '\n',content, '\n',date, '\n',time, '\n',)
      return {title, description, image, link, content, date, time };
    });
    res.send(education_content);
}); 




//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


//*************************************************** Asthma Action Plan ***************************************************


server_connection.get('/AAP_when_well', (req, res) => {
    let AAP_when_Well_Cont = [];
    read_Asthma_Content.readLinesFromFile('./Asthma_Action_Plan/when_well.txt').then((lines) => {
        console.log(lines);
        AAP_when_Well_Cont = lines;
        console.log(AAP_when_Well_Cont);
        res.json({ AAP_when_Well_Cont });
    })
        .catch((error) => {
            console.log(error);
        });

});


server_connection.get('/AAP_when_not_well', (req, res) => {
    let AAP_when_not_Well_Cont = [];
    read_Asthma_Content.readLinesFromFile('./Asthma_Action_Plan/when_not_well.txt').then((lines) => {
        console.log(lines);
        AAP_when_not_Well_Cont = lines;
        console.log(AAP_when_not_Well_Cont);
        res.json({ AAP_when_not_Well_Cont });
    })
        .catch((error) => {
            console.log(error);
        });

});

server_connection.get('/AAP_Symptoms_Get_Worse', (req, res) => {
    let AAP_Symptoms_Get_Worse_Cont = [];
    read_Asthma_Content.readLinesFromFile('./Asthma_Action_Plan/get_worse.txt').then((lines) => {
        console.log(lines);
        AAP_Symptoms_Get_Worse_Cont = lines;
        console.log(AAP_Symptoms_Get_Worse_Cont);
        res.json({ AAP_Symptoms_Get_Worse_Cont });
    })
        .catch((error) => {
            console.log(error);
        });

});


server_connection.get('/AAP_danger_signs', (req, res) => {
    let AAP_danger_signs_Cont = [];
    read_Asthma_Content.readLinesFromFile('./Asthma_Action_Plan/danger_signs.txt').then((lines) => {
        console.log(lines);
        AAP_danger_signs_Cont = lines;
        console.log(AAP_danger_signs_Cont);
        res.json({ AAP_danger_signs_Cont });
    })
        .catch((error) => {
            console.log(error);
        });

});


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


//*************************************************** Log in Connection ***************************************************

console.log("1");
server_connection.post('/data', (log_get_req, log_get_res) => {
    try {
        console.log("2");
        let userID = String(log_get_req.body.userID);
        let password = log_get_req.body.password;
        console.log(userID);
        console.log(password);

        Password.checkPass(userID, password)
            .then((result) => {
                log_get_res.send(result);
                console.log("out of get");
                console.log('--------------------------------------------------------------------------------------');
                console.log('--------------------------------------------------------------------------------------');
            })
            .catch((call_error) => {
                console.log(call_error);
                console.log("try error from call function");
            });



    }
    catch (post_error) {
        console.log(post_error);
        console.log("try error from post connection");
    }
});



server_connection.post('/userDetailsNameImg', async (req, res) => {

    const userID = req.body.userID;

    const userInfo = await User.getUserNameAndProfPic(userID);
    console.log('error line 2');
    const user_Name = userInfo.User_Name;
    const Prof_Img = userInfo.Prof_Img;

    console.log('error line 3');

    console.log(user_Name);
    console.log(Prof_Img);

    res.json({ user_Name: user_Name, Prof_Img: Prof_Img });

});



// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------



//*************************************************** Registration Connection ***************************************************

server_connection.post('/Registration_User_Data', (req, res) => {
    try {
        let user_Name = req.body.user_Name;
        let ph_Num = req.body.ph_Num;
        let email = req.body.email;
        let dOb = req.body.dOb;
        let address = req.body.address;
        let password = req.body.password;

        User.addUserToDatabase(user_Name, ph_Num, email, dOb, address, password)
        .then((result) => { 
            const message = `${result}`;
            console.log("About to send response");
            res.status(200).send(message);
        })
        .catch((call_error) => {
            console.log("Im hereeeeeeeeeeeeeeeeeeeeee");
            console.log(call_error);
            console.log("try error from call function");
            res.sendStatus(500);
        });
        console.log(user_Name, ph_Num, email, dOb, address, password);
    }
    catch (post_error) {
        console.log(post_error);
        console.log("try error from post connection");
    }
});



// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------



//*************************************************** Weather ***************************************************


server_connection.post('/get_API_call_count', async (req, res) => {
    let User_ID = req.body.userID;
    try{
        await api_call_controller.getCountofCall(User_ID)
        .then((response) => {
            console.log( '------------- ', response, ' ---------------------')
            res.send(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    catch(error) {
        console.log(error);
    }
})



server_connection.post('/add_API_call', async (req, res) => {
    let User_ID = req.body.userID;
    try{
        await api_call_controller.addNewCall(User_ID)
        .then((response) => {
            if(response === 'Done'){
                res.send('Done');
            }
            else {
                res.send('Nope');
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    catch(error) {
        console.log(error);
    }
})



server_connection.post('/weather_details_update', async (req, res) => {
    //const { latitude, longitude } = req.body;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let userID = req.body.userID;
    console.log( latitude, ' _______________________________________________________________');
    console.log( longitude, ' _______________________________________________________________');
    try {
        await Weather.updateFullWeatherDetails(userID, latitude, longitude);
        res.send('Weather details updated successfully');

      } catch (error) {
        res.send(error, ' from updateFullWeatherDetails API call');
      }
})

// let latitude = '';
// let longitude = '';
server_connection.post('/weather_forecast_details_update', async (req, res) => {
    //const { latitude, longitude } = req.body;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let userID = req.body.userID;
    console.log( latitude, ' _______________________________________________________________');
    console.log( longitude, ' _______________________________________________________________');
    try {
        await Weather.update_Weather_Forecast_Data_By_UserID(userID, latitude, longitude);
        res.send('Weather forecast details updated successfully');

      } catch (error) {
        res.send(error, ' from update_Weather_Forecast_Data_By_UserID API call');
      }
    //   latitude = '';
    // longitude = '';
    // userID = '';
})



server_connection.post('/get_weather_details_from_database', async (req, res) => {
    let userID = req.body.userID;
    console.log(userID);
    if (!userID || isNaN(userID)) {
        console.error('Invalid user ID');
        return res.status(400).send('Invalid user ID');
      }

    await Weather.getFromDatabase_WeatherDetails_buUserID(userID)
    .then((weather_Details_Response) => {
        if (!weather_Details_Response) {
            console.log('No data in weather_Details_Response');
            return res.status(404).send('No data found');
        }
        else {
            res.send(weather_Details_Response);
        }
    })
    .catch((error) => {
        console.log(error, " from get_weather_details_from_database post call");
        res.status(500).send('Error fetching weather details');
    })
})



server_connection.post('/get_weather_forecast_details_from_database', async (req, res) => {
    let userID = req.body.userID;
    if (!userID || isNaN(userID)) {
        console.error('Invalid user ID');
        return res.status(400).send('Invalid user ID');
      }
      
    await Weather.getFromDatabase_WeatherForecastDetails_buUserID(userID)
    .then((weather_forecast_Details_Response) => {
        if (!weather_forecast_Details_Response) {
            console.log('No data in weather_forecast_Details_Response');
            return res.status(404).send('No data found');
        }
        else {
            console.log(weather_forecast_Details_Response);
            res.send(weather_forecast_Details_Response);
        }
    })
    .catch((error) => {
        console.log(error, " from get_weather_forecast_details_from_database post call");
        res.status(500).send('Error fetching weather forecast details');
    })
})

