const linebot = require('linebot');
const express = require('express');
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");



const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();


/*	測試Heroku平台的Node.js環境可以運作*/
app.get('/',function(req,res){
    res.send('Hello World!');
});
app.post('/linewebhook', linebotParser);



const result = []; // 建立一個儲存結果的容器
const earthquake = function () {
  request({
    url: "http://www.cwb.gov.tw/V7/modules/MOD_EC_Home.htm", // 中央氣象局網頁
    method: "GET"
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body); // 載入 body
    
    const table_tr = $(".BoxTable tr"); // 爬最外層的 Table(class=BoxTable) 中的 tr

    for (let i = 1; i < table_tr.length; i++) { // 走訪 tr
      const table_td = table_tr.eq(i).find('td'); // 擷取每個欄位(td)
      const time = table_td.eq(1).text(); // time (台灣時間)
      const latitude = table_td.eq(2).text(); // latitude (緯度)
      const longitude = table_td.eq(3).text(); // longitude (經度)
      const amgnitude = table_td.eq(4).text(); // magnitude (規模)
      const depth = table_td.eq(5).text(); // depth (深度)
      const location = table_td.eq(6).text(); // location (位置)
      const url = table_td.eq(7).text(); // url (網址)
      // 建立物件並(push)存入結果
      result.push(time);
    }
  });
};









function limitRandomNumber(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}

var FoodList =['巧味','汕頭意麵','歡歡','來來軒','影印店小籠包',
'昌平','龍門客棧','麥當勞','肯德基','拿坡里','新永豆','黑永豆',
'舊永豆','胖老爹','海之蚵','佐賀','飯鋪子','紅豆','福萱','響樂',
'浪人鐵板燒','九龍城','鴨香麵','八方雲集','老先覺','饌喜堂','聖明自助餐',
'嘉鄰快餐','吐司森林','飯尾鰭','海之柯','再抽一次','貢龜','朝祥煮','Morning House',
'7-11','小管炒飯','海膽炒蛋','德記，可是倒了','烏龍大王，可是倒了'];
var pose = ['69式','傳教式','火車便當','背入式','Oop式','騎乘式','活塞式','口交','毒龍鑽','彎腰下狗式'];


//第一個是key 第二個是值
var myDictionary = {
	'順口溜':'王代1\n2薩斯\n鄧佩3\n李4奇\n5負責\n6國有\n謝7佩\n8布魯克\n莊潤9\n10至華',
	'家鄉':'別問我家鄉',
	'沒聽過':'去試試看',
	'點名了嗎':'點了 可以回家了',
	'小小機器人':'功用非常多',
	'會幫爸爸':'捅屁眼', 
	'會幫媽媽':'飛上天',
	'會幫哥哥':'打手槍',
	'還會跟我':'喝豆漿',
	'不要':'不要就是要',
	'要':'就是很想要',
	'你會做什麼':'我會......會吹口琴、玩玉簫、泡泡妞、看小書、占卜星相、觀人眉宇、風流倜儻、竊玉偷香。',
	'今天的幸運色':'綠色',
	'wow':'AAA',
	'兇':'我看過很兇的，但沒看過這麼兇的',
	'貓貓':'大口袋',
	'兇':'我看過很兇的，但沒看過這麼兇的',
	'哪一間鹹酥雞最好吃':'巧味',
	'我覺得可以':'貓貓真的很嚴格',
	'對':'對什麼對',
	'嘻嘻':'嘻三小',
	'扭蛋':'沒有蛋',
	'你在說一次':'沒有就是沒有',
	'好':'好什麼好',
	'幹':'留點口德啦幹你娘機掰',
	'Hello':'World!',
	
};
var allDictionary = [];
var msg;



bot.on('message', function (event) {
    if(event.message.type == 'sticker'){
			
	}
	
	
    else if (event.message.type == 'text') {
		
		if(event.message.text.match('zz')!=null || event.message.text.match('ZZ')!=null){
			
			event.reply({
				type: 'sticker',
				packageId: '2',
				stickerId: '26'
			});
			
		}
		else if(event.message.text == '地震'){
			earthquake();
			event.reply(result).then(function (data) {
                // success 
                console.log(msg);
            }).catch(function (error) {
                // error 
                console.log('error');
            });
			
		}
        /*
	     跟餐廳有關的操作：隨機、新增、移除、查看
	    */
		else if(event.message.text == '今天要吃什麼' || event.message.text == '今天要吃甚麼' || event.message.text == '今天要吃啥' || event.message.text == '今天吃什麼' || event.message.text == '今天吃啥' || event.message.text.match('吃什麼') || event.message.text.match('吃甚麼')!=null){
			var ListLength = FoodList.length;
			event.reply(FoodList[limitRandomNumber(0,ListLength-1)]).then(function (data) {
                // success 
                console.log(msg);
            }).catch(function (error) {
                // error 
                console.log('error');
            });
		}
		else if(event.message.text.match('新增餐廳:')!=null || event.message.text.match('新增餐廳：')!=null){
			
			var newString = event.message.text.substring(5);
			if(FoodList.indexOf(newString)==-1){

				FoodList.push(newString);
				event.reply('已新增'+newString+'。').then(function (data) {
					// success 
				    console.log(msg);
					}).catch(function (error) {
				    // error 
				    console.log('error');
					});
				}
				else{
					event.reply('裡面已經有這個了啦').then(function (data) {
				    // success 
					console.log(msg);
					}).catch(function (error) {
					// error 
					console.log('error');
					});
			}
		}
		else if (event.message.text.match('移除餐廳:') != null || event.message.text.match('移除餐廳：') != null) {

			var newString = event.message.text.substring(5);
			if(FoodList.indexOf(newString)!=-1){
				
				var newnewString = FoodList.splice(FoodList.indexOf(newString),1);

				event.reply('已移除'+newnewString+'。').then(function (data) {
                // success 
                console.log(msg);
				}).catch(function (error) {
                // error 
                console.log('error');
				});
			}else{
				event.reply('裡面沒有這間啦').then(function (data) {
                // success 
                console.log(msg);
				}).catch(function (error) {
                // error 
                console.log('error');
				});
			}
		}
		else if (event.message.text == '全部的餐廳' || event.message.text == '所有餐廳') {
			
			var _all = FoodList.join('、').toString();

			event.reply(_all).then(function (data) {
                // success 
                console.log(msg);
            }).catch(function (error) {
                // error 
                console.log('error');
            });
		}

		/*
		 姿勢
		*/
		else if(event.message.text.match('姿勢:')!=null || event.message.text.match('姿勢：')!=null){
			var newString = event.message.text.substring(3);
			var ListLength = posze.length;
			event.reply(newString+pose[limitRandomNumber(0,ListLength-1)]).then(function (data) {
                // success 
                console.log(msg);
            }).catch(function (error) {
                // error 
                console.log('error');
            });
		}
			

		/*
		 教說話的地方
		*/
		else if(event.message.text.match('教你說話:')!=null || event.message.text.match('教你說話：')!=null || event.message.text.match('教你講話：')!=null || event.message.text.match('教你講話:')!=null){
			var newString = event.message.text.substring(5);
			var index = newString.indexOf('；');
			var say = newString.substring(index+1);
			var remember = newString.substring(0,index);
			if(index == -1){
				event.reply('格式錯誤。').then(function (data) {
                // success 
                console.log(msg);
				}).catch(function (error) {
                // error 
                console.log('error');
				 });
			
			}else{
			
				myDictionary[remember] = say;
				event.reply('學會了。').then(function (data) {
                // success 
                console.log(msg);
				}).catch(function (error) {
                // error 
                console.log('error');
				});
			}
		}

			
		/*
		 看全部的值，現在有：餐廳、字典
		*/
		else if(event.message.text == 'Admin'){
			var ForMeToTestRestaurant = '\''+FoodList.join('\',\'').toString()+'\''; //把全部的餐廳變成我要的格式
			event.reply(ForMeToTestRestaurant).then(function (data) {
                // success 
                console.log(msg);
            }).catch(function (error) {
                // error 
                console.log('error');
            });
		}
		else if (event.message.text == 'Admin2') {
			allDictionary.length =0;
			for(var key in myDictionary){
				 allDictionary.push('\''+key+'\':\''+myDictionary[key]+'\''); //把字典變成我要的格式
			}

			event.reply(allDictionary.toString()).then(function (data) {
			// success 
			console.log(msg);
			}).catch(function (error) {
			// error 
			console.log('error');
			});
		}

		/*
		 教說話顯示的地方
		*/
		else{   
			for(var key in myDictionary){
				if(key == event.message.text){
        
				    event.reply(myDictionary[key]+'').then(function (data) {
					 // success 
						console.log(msg);
					}).catch(function (error) {
				     // error 
			           console.log('error');
					});
				}
			}
		}
	}

	
});

app.listen(process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});