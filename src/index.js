/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

let myenv

export default {
	async fetch(request, env, ctx) {
		return await handleRequest(request, env, ctx)
	},
};

async function handleRequest(request, env, ctx) {
    const { method, url } = request
    const { searchParams } = new URL(url)
    const id = searchParams.get('id')
    myenv = env
    switch(method) {
        case "GET": return await handleGet(request, env, id)
    }
}

const handleGet = async (request, env, id) => {
  if (id) {
    switch(id) {
      case "testing": return await handleTesting(request, env)
      case "infopalestina": return await handleInfopalestina(request, env)
      case "infopalestina2": return await handleInfopalestina2(request, env)
      case "infopalestina3": return await handleInfopalestina3(request, env)
      case "infopalestina4": return await handleInfopalestina4(request, env)
	  case "infopalestina5": return await handleInfopalestina5(request, env)
	  case "infopalestina6": return await handleInfopalestina6(request, env)
	  case "infopalestina7": return await handleInfopalestina7(request, env)
      case "txtfromgaza": return await handleTxtfromgaza(request, env)
      case "infodonordarah": return await handleInfodonordarah(request, env)
      case "bsmimobile": return await handleBsmimobile(request, env)
      default: return await handleDefault(request, env)
    }
  }
  else {
    return new Response("ok");
  }
}

async function sendtelegram(code,format,caption,src) {
  
  const TELEGRAM_BOT_TOKEN = myenv.API_TOKEN_TELEGRAM_NUZULUL_INFOBSMIBOT
  let chatId = ""
  if(code=='INFOPALESTINA'){chatId = myenv.TELEGRAM_CHATID_INFOPALESTINA;caption = caption+"\n\n"+"Simak terus Info Palestina terkini di Telegram https://t.me/info_palestina";}
  if(code=='INFODONORDARAH')chatId = myenv.TELEGRAM_CHATID_INFODONORDARAH
  if(code=='BSMIMOBILE')chatId = myenv.TELEGRAM_CHATID_BSMIMOBILE
  //const chatId = "@bsmi_tv"
  
  if(format == "photo") {
      const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
      const params = {
        chat_id: chatId,
        photo: src,
        caption: caption,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          return 'Message sent successfully!'
        } else {
          return 'Failed to send message.'
        }
      } catch (error) {
        console.error(error);
        return 'Error occurred while sending the message.'
      }
  }
  else if(format == "video") {
      const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`;
      const params = {
        chat_id: chatId,
        video: src,
        caption: caption,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          return 'Message sent successfully!'
        } else {
          return 'Failed to send message.'
        }
      } catch (error) {
        console.error(error);
        return 'Error occurred while sending the message.'
      }
  }
  else if(format == "text"){
      const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const params = {
        chat_id: chatId,
        text: caption,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          return 'Message sent successfully!'
        } else {
          return 'Failed to send message.'
        }
      } catch (error) {
        console.error(error);
        return 'Error occurred while sending the message.'
      }
  }
}

async function sendhookrender(command,caption,source) {

      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        } else if (contentType.includes("application/text")) {
          return response.text();
        } else if (contentType.includes("text/html")) {
          return response.text();
        } else {
          return response.text();
        }
      }
      
      const apiUrl = `https://hookrender.onrender.com/posting`;
      const API_TOKEN_NUZULZ_HOOKRENDERKEY = myenv.API_TOKEN_NUZULZ_HOOKRENDERKEY
      const API_TOKEN_NUZULZ_HOOKRENDERUSER = myenv.API_TOKEN_NUZULZ_HOOKRENDERUSER
      const API_TOKEN_NUZULZ_HOOKRENDERPASS = myenv.API_TOKEN_NUZULZ_HOOKRENDERPASS
      const params = {
        command: command,
        source: source,
        caption: caption,
        apikey: API_TOKEN_NUZULZ_HOOKRENDERKEY,
        user: API_TOKEN_NUZULZ_HOOKRENDERUSER,
        pass: API_TOKEN_NUZULZ_HOOKRENDERPASS
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const results = await gatherResponse(response)
        if (results == "ok") {
          return results
        } else {
          return "error"
        }
        
      } catch (error) {
        console.error(error);
        return "error"
      }
}

async function translatetext(sourceLanguage,targetLanguage,text) {

      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        } else if (contentType.includes("application/text")) {
          return response.text();
        } else if (contentType.includes("text/html")) {
          return response.text();
        } else {
          return response.text();
        }
      }
      
      const apiUrl = `https://script.google.com/macros/s/AKfycbwsIFFPl5l_uyc9Whz2bOhsTnF-M02d_9HMqf12J5hvm5qKqVzn-pI9WbAwhZVh0yZd7g/exec`;
      const API_TOKEN_NUZULZ_HOOKAPI = myenv.API_TOKEN_NUZULZ_HOOKAPI
      const params = {
        command: "translate",
        data: {
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
          text: text
        },
        apikey: API_TOKEN_NUZULZ_HOOKAPI
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const results = await gatherResponse(response)
        if (results != "status ok") {
          return results
        } else {
          return "error"
        }
        
      } catch (error) {
        console.error(error);
        return "error"
      }
}

async function sendonesignalbsmimobile(channel,headings, msg) {

      async function gatherResponse(response) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return JSON.stringify(await response.json());
        } else if (contentType.includes("application/text")) {
          return response.text();
        } else if (contentType.includes("text/html")) {
          return response.text();
        } else {
          return response.text();
        }
      }
      
      const apiUrl = `https://onesignal.com/api/v1/notifications`;
      const API_TOKEN_NUZULZ_ONESIGNALBSMIMOBILE = myenv.API_TOKEN_NUZULZ_ONESIGNALBSMIMOBILE
      const ONESIGNAL_SEGMENTS_BSMIMOBILE = myenv.ONESIGNAL_SEGMENTS_BSMIMOBILE
      const params = {
            contents: {
              "en": msg,
            },
            headings: {
              "en": headings,
            },
            small_icon: 'notification',
            app_id: "53202db7-cdda-4516-bb79-de714bc889c9", //BSMIMOBILE
            android_channel_id: channel,
            included_segments: [
                //'All',
                //'Test Users'
                ONESIGNAL_SEGMENTS_BSMIMOBILE
              ]
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+API_TOKEN_NUZULZ_ONESIGNALBSMIMOBILE
          },
          body: JSON.stringify(params),
        });

        const results = await gatherResponse(response)
        return results
        
      } catch (error) {
        console.error(error);
        return "error"
      }
}

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

class Hookdb {
  constructor() {    
    return this.init()
  }
  async init() {
    return this
  }
  async put(key,value) {
    const stmt = myenv.D1.prepare('SELECT myvalue FROM hookkv WHERE mykey = ?1').bind(key);
    const values = await stmt.first()
    if(values == null){
      const stmt = myenv.D1.prepare('INSERT INTO hookkv (mykey,myvalue) VALUES (?1,?2)').bind(key,value);
      const values = await stmt.run()
      return values
    }else{
      const stmt = myenv.D1.prepare('UPDATE hookkv SET myvalue = ?2 WHERE mykey = ?1').bind(key,value);
      const values = await stmt.run()
      return values
    }
    return values
  }
  async insert(key,value) {
      const stmt = myenv.D1.prepare('INSERT INTO hookkv (mykey,myvalue) VALUES (?1,?2)').bind(key,value);
      const values = await stmt.run()
      return values
  }
  async update(key,value) {
      const stmt = myenv.D1.prepare('UPDATE hookkv SET myvalue = ?2 WHERE mykey = ?1').bind(key,value);
      const values = await stmt.run()
      return values
  }
  async get(key) {
    const stmt = myenv.D1.prepare('SELECT myvalue FROM hookkv WHERE mykey = ?1').bind(key);
    const values = await stmt.first();
    let output
    if(values == null){
      output = null
    } else {
      output = values.myvalue
    }
    return output
  }
}

const handleDefault = async (request, env) => {
  return new Response("ok");
}

const handleTesting = async (request, env) => {

  async function testingdb(){
    let lastcode
    try{
      const hookdb = await new Hookdb()
      lastcode = await hookdb.get("testing")
      if (lastcode == null) {
        await hookdb.put("testing",2)
        lastcode = await hookdb.get("testing")
      }
    } catch(e) {}
    return lastcode
  }  
  let testingdb1 = await testingdb()
  
  let output = {
    status: "ok",
    testingdb1: testingdb1,
    testingkv1: await env.DB.get("infopalestina")
  }
  
  let res = JSON.stringify(output)
  
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  });
}

const handleInfopalestina = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://t.me/s/SahabatPalestinaID"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  //await env.DB.put("infopalestina",2)
  const lastcode = await env.DB.get("infopalestina")
  //console.log(lastcode)
  let output = '{"status":"ok"}'
  //console.log(data)
  for (let i = 0; i < data.length;i++) {
    //console.log('id:'+data[i].id)
    //console.log('lastcode:'+lastcode)
    //if (data[i].id > parseInt(lastcode))console.log('ok')
    if (data[i].id > parseInt(lastcode)) {
    //if (data[i].id == 8080) {
      //console.log('id:'+data[i].id)
      let title = data[i].title || ""      
      title = decodeEntities(title)
      title = title.replace("#SahabatPalestina_ID","")
      //console.log(title)
      if(title.includes('donasi'))continue
      if(title.includes('SahabatPalestinaID'))continue
      if(data[i].photo) {
        const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].photo)
        data[i].response = response
      }
      else if(data[i].video) {
        const response = await sendtelegram("INFOPALESTINA","video",title,data[i].video)
        data[i].response = response
      }
      else {
        const response = await sendtelegram("INFOPALESTINA","text",title,"")
        data[i].response = response
      }      
      output = JSON.stringify(data[i], null, 2)
      await env.DB.put("infopalestina",data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });  
}

const handleInfopalestina2 = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://t.me/s/infopalestineterkini"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  //await env.DB.put("infopalestina2",2)
  const lastcode = await env.DB.get("infopalestina2")
  //console.log(lastcode)
  let output = '{"status":"ok"}'
  
  for (let i = 0; i < data.length;i++) {
    //console.log(data[i])
    if (data[i].id > parseInt(lastcode)) {
    //if (data[i].id == 8080) {
      
      let title = data[i].title || ""
      title = decodeEntities(title)
      //console.log(title)
      if(title.includes('donasi'))continue
      if(title.includes('infopalestineterkini'))continue
      if(data[i].photo) {
        const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].photo)
        data[i].response = response
      }
      else if(data[i].video) {
        const response = await sendtelegram("INFOPALESTINA","video",title,data[i].video)
        data[i].response = response
      }
      else {
        //const response = await sendtelegram("INFOPALESTINA","text",title,"")
        //data[i].response = response
        continue
      }      
      output = JSON.stringify(data[i], null, 2)
      await env.DB.put("infopalestina2",data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });  
}

const handleInfopalestina3 = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://t.me/s/ShehabTelegram"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  //await env.DB.put("infopalestina3",2)
  let lastcode
  try{
    lastcode = await env.DB.get("infopalestina3")
  } catch(e) {
    await env.DB.put("infopalestina3",2)
    lastcode = await env.DB.get("infopalestina3")
  }
  //console.log(lastcode)
  let output = '{"status":"ok"}'
  let breakingimg = "https://cdn5.telegram-cdn.org/file/qJmSigOp3-TNali5erzz77z_xx0AWw0Ps8o36JkHHKKYwgvixl5g801nzY8VqElgWpsJbFfqug9oNpcniGp-3MG3pGai9QH9a_Nk31nHqRoJDWig-7KcN6cF4X38h-VPdJRUx5hUoP7n2SI2qWV94Cp0NFanHqTOt8SXwkC_7XsgOT0ZDrj5qyaGw5PfQME_tCx6kVYWlsIVbgoT8rRPRVyeSmE1-XnEMoCOIieLJQw__bVYiMq3pEeSyprG9csuEGp_cAZxN1kWv_R7pa0u7COcEEIRbe1BM5O5ei2vLQ-ufY2EOJMXpG3rkkcgVzIVFnJlJRmOJewniSLg4yBTlg.jpg"
  
  for (let i = 0; i < data.length;i++) {
    //console.log(data[i])
    if (data[i].id > parseInt(lastcode)) {
    //if (data[i].id == 8080) {
      
      let title = data[i].title || ""
      title = title.replace("##########","")
      title = decodeEntities(title)
      title = title.replace("&rlm;","")
      title = title.replace("&lrm;","")
      // jika bukan photo atau video skip
      if((!data[i].photo)&&(!data[i].video))continue
      if(title.includes("shehabnews.com"))continue
      let translateid = await translatetext("ar","id",title)
      translateid = translateid.replace("#Shehab:","")
      translateid = translateid.replace("#Shehab","")
      translateid = translateid.replace("Shehab","")
      translateid = translateid.replace("Koresponden","")      
      if(translateid == "error") {continue}else{data[i].translate = translateid}
      if(translateid.includes("Ibrani"))continue
      if(translateid.startsWith("Mendesak"))translateid = translateid.replace("Mendesak","Breaking News")      
      if(data[i].photo) {
        if(translateid.startsWith("#Mendesak")){
            translateid = translateid.replace("#Mendesak","#BreakingNews")
            const response = await sendtelegram("INFOPALESTINA","photo",translateid,breakingimg)
            data[i].response = response
        }else{
            const response = await sendtelegram("INFOPALESTINA","photo",translateid,data[i].photo)
            data[i].response = response
        }
      }
      else if(data[i].video) {
        const response = await sendtelegram("INFOPALESTINA","video",translateid,data[i].video)
        data[i].response = response
      }
      else {
        continue
        //const response = await sendtelegram("INFOPALESTINA","text",title,"")
        //data[i].response = response
      }      
      output = JSON.stringify(data[i], null, 2)
      await env.DB.put("infopalestina3",data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleInfopalestina4 = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://t.me/s/daysofpal"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  //await env.DB.put("infopalestina4",2)
  let lastcode
  try{
    lastcode = await env.DB.get("infopalestina4")
  } catch(e) {
    await env.DB.put("infopalestina4",2)
    lastcode = await env.DB.get("infopalestina4")
  }
  //console.log(lastcode)
  let output = '{"status":"ok"}'
  let breakingimg = "https://cdn5.telegram-cdn.org/file/qJmSigOp3-TNali5erzz77z_xx0AWw0Ps8o36JkHHKKYwgvixl5g801nzY8VqElgWpsJbFfqug9oNpcniGp-3MG3pGai9QH9a_Nk31nHqRoJDWig-7KcN6cF4X38h-VPdJRUx5hUoP7n2SI2qWV94Cp0NFanHqTOt8SXwkC_7XsgOT0ZDrj5qyaGw5PfQME_tCx6kVYWlsIVbgoT8rRPRVyeSmE1-XnEMoCOIieLJQw__bVYiMq3pEeSyprG9csuEGp_cAZxN1kWv_R7pa0u7COcEEIRbe1BM5O5ei2vLQ-ufY2EOJMXpG3rkkcgVzIVFnJlJRmOJewniSLg4yBTlg.jpg"
  
  for (let i = 0; i < data.length;i++) {
    //console.log(data[i])
    if (data[i].id > parseInt(lastcode)) {
    //if (data[i].id == 49077) {
      
      let title = data[i].title || ""
      title = title.replace("Breaking","")
      title = decodeEntities(title)
      let translateid = await translatetext("en","id",title)
      if(translateid == "error") {continue}else{data[i].translate = translateid}
      if(data[i].photo) {
        let mytitle = data[i].title || ""
        if (mytitle.includes("Breaking")) {
          translateid = "Breaking News "+translateid
          const response = await sendtelegram("INFOPALESTINA","photo",translateid,breakingimg)
          data[i].response = response
        } else {continue}
      }
      else if(data[i].video) {
        const response = await sendtelegram("INFOPALESTINA","video",translateid,data[i].video)
        data[i].response = response
      }
      else {
        let mytitle = data[i].title || ""
        if (mytitle.includes("Breaking")) {
          translateid = "Breaking News "+translateid
          const response = await sendtelegram("INFOPALESTINA","photo",translateid,breakingimg)
          data[i].response = response
        } else {continue}
      }      
      output = JSON.stringify(data[i], null, 2)
      await env.DB.put("infopalestina4",data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleInfopalestina5 = async (request, env) => {
	
  const dbname = "infopalestina5"
  const url = "https://t.me/s/halopalestinacom"

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
       .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_thumb", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('thumbnail', match);
              });
          }
          
          
        }
      })
     .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  
  const hookdb = await new Hookdb()
  let lastcode
  try{
    console.log('db ok')
    lastcode = await hookdb.get(dbname)
    if(lastcode == null){
      await hookdb.put(dbname,2)
      lastcode = await hookdb.get(dbname)
    }
  } catch(e) {
    console.log('db error')
  }
  console.log(lastcode)
  
  let output = '{"status":"ok"}'
  let breakingimg = "https://nuzulul.github.io/uploads/breakingnews.jpg"
  
  for (let i = 0; i < data.length;i++) {
    //console.log(data[i])
    if (data[i].id > parseInt(lastcode)) {
    //if (data[i].id == 49077) {
      
      let title = data[i].title || ""
	  title = decodeEntities(title)
      title = title.split("Sumber:")
	  title = title[0]
	  data[i].newtitle = title

      if(data[i].photo) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].photo)
          data[i].response = response

      }
      else if(data[i].video) {
		
		  
        const response = await sendtelegram("INFOPALESTINA","video",title,data[i].video)
        data[i].response = response
      }
      else if(data[i].thumbnail) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].thumbnail)
          data[i].response = response

      }
      else {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,breakingimg)
          data[i].response = response
		  
      }      
      output = JSON.stringify(data[i], null, 2)
	  await hookdb.put(dbname,data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleInfopalestina6 = async (request, env) => {
	
  const dbname = "infopalestina6"
  const url = "https://t.me/s/palestinaterkini"

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_thumb", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('thumbnail', match);
              });
          }
          
          
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  
  const hookdb = await new Hookdb()
  let lastcode
  try{
    console.log('db ok')
    lastcode = await hookdb.get(dbname)
    if(lastcode == null){
      await hookdb.put(dbname,2)
      lastcode = await hookdb.get(dbname)
    }
  } catch(e) {
    console.log('db error')
  }
  console.log(lastcode)
  
  let output = '{"status":"ok"}'
  let breakingimg = "https://nuzulul.github.io/uploads/breakingnews.jpg"
  
  for (let i = 0; i < data.length;i++) {
    
    if (data[i].id > parseInt(lastcode)) {
    
      
      let title = data[i].title || ""
	  title = decodeEntities(title)

      if(data[i].photo) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].photo)
          data[i].response = response

      }
      else if(data[i].video) {
		
		  
        const response = await sendtelegram("INFOPALESTINA","video",title,data[i].video)
        data[i].response = response
      }
      else if(data[i].thumbnail) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].thumbnail)
          data[i].response = response

      }
      else {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,breakingimg)
          data[i].response = response
		  
      }      
      output = JSON.stringify(data[i], null, 2)
	  await hookdb.put(dbname,data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleInfopalestina7 = async (request, env) => {
	
  const dbname = "infopalestina7"
  const url = "https://t.me/s/eyeonpal"

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_thumb", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('thumbnail', match);
              });
          }
          
          
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  
  const hookdb = await new Hookdb()
  let lastcode
  try{
    console.log('db ok')
    lastcode = await hookdb.get(dbname)
    if(lastcode == null){
      await hookdb.put(dbname,2)
      lastcode = await hookdb.get(dbname)
    }
  } catch(e) {
    console.log('db error')
  }
  console.log(lastcode)
  
  let output = '{"status":"ok"}'
  let breakingimg = "https://nuzulul.github.io/uploads/breakingnews.jpg"
  
  for (let i = 0; i < data.length;i++) {
    
    if (data[i].id > parseInt(lastcode)) {
	//if (data[i].id == 10378) {
      
      let title = data[i].title || ""
	  title = decodeEntities(title)
	  title = await translatetext("en","id",title)
	  data[i].translate = title

      if(data[i].photo) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].photo)
          data[i].response = response

      }
      else if(data[i].video) {
		
		  
        const response = await sendtelegram("INFOPALESTINA","video",title,data[i].video)
        data[i].response = response
      }
      else if(data[i].thumbnail) {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,data[i].thumbnail)
          data[i].response = response

      }
      else {
        

          const response = await sendtelegram("INFOPALESTINA","photo",title,breakingimg)
          data[i].response = response
		  
      }      
      output = JSON.stringify(data[i], null, 2)
	  await hookdb.put(dbname,data[i].id)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleTxtfromgaza = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://t.me/s/info_palestina"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on(".tgme_widget_message_wrap", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
          const code = element.getAttribute("data-post")
          const arr = code.split("/")
          const id = arr[1]
          addToLast('id',id)
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_text", {
        text(text) {
          addToLast('title', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_photo_wrap", {
        element(element) {

          const regex = /background-image:url\(["']?([^"']*)["']?\)/gm;
          const str = element.getAttribute("style");
          let m;

          while ((m = regex.exec(str)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (m.index === regex.lastIndex) {
                  regex.lastIndex++;
              }
              
              // The result can be accessed through the `m`-variable.
              m.forEach((match, groupIndex) => {
                  //console.log(`Found match, group ${groupIndex}: ${match}`);
                  if (groupIndex == 1) addToLast('photo', match);
              });
          }
          
          
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .tgme_widget_message_video_wrap video", {
        element(element) {
          addToLast('video', element.getAttribute("src"));
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message .tgme_widget_message_bubble .tgme_widget_message_video_player .message_video_duration", {
        text(text) {
          addToLast('duration', text.text);
        }
      })
      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  const json = JSON.stringify(data, null, 2)
  let lastcode
  try{
    lastcode = await env.DB.get("txtfromgaza")
    lastcode = JSON.parse(lastcode)
    if(lastcode == null){
      lastcode = ["2","3"]
      lastcode = JSON.stringify(lastcode)
      await env.DB.put("txtfromgaza",lastcode)
      lastcode = await env.DB.get("txtfromgaza")
      lastcode = JSON.parse(lastcode)
    }
  } catch(e) {
    lastcode = [2]
    lastcode = JSON.stringify(lastcode)
    await env.DB.put("txtfromgaza",lastcode)
    lastcode = await env.DB.get("txtfromgaza")
    lastcode = JSON.parse(lastcode)
  }
  console.log(lastcode)
  let output = '{"status":"ok"}'
  
  for (let i = data.length - 1; i > -1;i--) {
    //console.log(data[i])
    if (!lastcode.includes(data[i].id)) {
    //if (data[i].id == 8080) {
      
      let title = data[i].title || ""
      title = title.replace("##########","")
      title = title.replace("#Shehab","")
      title = title.replace("Shehab","")
      title = title.replace("Koresponden","")
      title = decodeEntities(title)
      if(title.includes("Ibrani"))continue
      title = title+" #txtfromgaza #gaza #palestina #palestine"
      // jika bukan video skip
      if(!data[i].video)continue
      if(!data[i].duration)continue
      let duration = data[i].duration
      duration = duration.split(":")
      if(duration[0] != 0)continue
      if(duration[1] > 30)continue                  
      if(data[i].video) {
        const response = await sendhookrender("video",title,data[i].video)
        data[i].response = response
      }
      else {
        continue
      }      
      output = JSON.stringify(data[i], null, 2)
      lastcode.push(data[i].id)
      lastcode = lastcode.slice(-50)
      lastcode = JSON.stringify(lastcode)
      await env.DB.put("txtfromgaza",lastcode)
      break
    }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleInfodonordarah = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    const url = "https://blood4life.id/pasien?tipe=semua&darah=semua"
    var response = await fetch(url);
    function addToLast(attr, text) {
      var lastIndex = values.length - 1;
      if (lastIndex < 0) {
        // this shouldn't happen, since there should always have been
        // an object created by the parent [data-code] div
        return;
      }
      // need to add them to the previous value, just in case if there
      // are multiple text chunks
      values[lastIndex][attr] = (values[lastIndex][attr] || '') + text;
    }
    await new HTMLRewriter()
      .on("section.products.py-4 > div > div:nth-child(1) > div", { 
        element(element) { 
          values.push({
            container: element.getAttribute("class")
          });
        }
      })
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.meta.mb-2 > h4 > span.badge.badge-standard.badge-light.mr-2", {
        text(text) {
          addToLast('lokasi', text.text);
        }
      })
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > a > h2", {
        text(text) {
          addToLast('id', text.text);
        }
      })      
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(1) > div > span", {
        text(text) {
          addToLast('nama', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(2) > div > span", {
        text(text) {
          addToLast('goldar', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(3) > div > span", {
        text(text) {
          addToLast('jumlah', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(4) > div > span", {
        text(text) {
          addToLast('jenis', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(5) > div > span", {
        text(text) {
          addToLast('rs', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(6) > div > span", {
        text(text) {
          addToLast('narahubung', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(7) > div > span", {
        text(text) {
          addToLast('kontak', text.text);
        }
      }) 
      .on("section.products.py-4 > div > div:nth-child(1) > div > div > div.content.mt-1 > div:nth-child(8) > div > span", {
        text(text) {
          addToLast('tanggal', text.text);
        }
      }) 

      .transform(response).arrayBuffer();
    
    return values
  }
  
  const data = await handleRequest(request)
  data.forEach(function(arr,index){
    if(arr.container != 'col-lg-6 col-12')data.splice(index, 1);
  })
  data.reverse()
  
  const hookdb = await new Hookdb()
  let kodedonor
  try{
    console.log('db ok')
    kodedonor = await hookdb.get("infodonordarah")
    if(kodedonor == null){
      let data = JSON.stringify(['#A'])
      await hookdb.put("infodonordarah",data)
      kodedonor = await hookdb.get("infodonordarah")
    }
  } catch(e) {
    console.log('db error')
  }
  if(kodedonor != undefined) kodedonor = JSON.parse(kodedonor)
  //console.log(kodedonor)
  let output = '{"status":"ok"}'
  
  for(let i=0;i<data.length;i++){
        if(!kodedonor.includes(data[i].id)){
          console.log('run')
          kodedonor.push(data[i].id)
          kodedonor = kodedonor.slice(-50)
          await hookdb.put("infodonordarah",JSON.stringify(kodedonor))
          let msg = "URGENT\n\n"+
                    "Dibutuhkan relawan merah donor darah segera sebagai berikut:\n"+
                    "1. Area :"+data[i].lokasi+"\n"+
                    "2. Tanggal "+data[i].tanggal+"\n"+
                    "3. Nama pasien "+data[i].nama+"\n"+
                    "4. Golongan darah "+data[i].goldar+"\n"+
                    "5. Jumlah pendonor "+data[i].jumlah+"\n"+
                    "6. Jenis donor "+data[i].jenis+"\n"+
                    "7. Rumah Sakit "+data[i].rs+"\n"+
                    "8. Narahubung "+data[i].narahubung+"\n"+
                    "9. HP "+data[i].kontak+"\n"+
                    "10. Keterangan : -\n\n"+
                    "Diharap dapat membantu menyebarluaskan informasi simak terus di telegram https://t.me/info_donor_darah . Permintaan donor darah https://forms.gle/3LoD4MnAVCF9NMUb7 . Demikian atas perhatiannya disampaikan banyak terima kasih."
          const response = await sendtelegram("INFODONORDARAH","text",msg,"")
          data[i].response = response
          output = JSON.stringify(data[i], null, 2)
          break
        }
  }
  
  //const res = json
  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });
      
}

const handleBsmimobile = async (request, env) => {
  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });
  
  async function handleRequest(request) {
  
    const random = Math.floor(Math.random() * 100)
    //const cor = 'https://script.google.com/macros/s/AKfycbz2cNhBo6uGCS_a-k-h3oUHCQCspnHjToUuPEtuiL5uQt5yhIEwCY9kBTMoeG5EANw/exec?url=' //jeruk
    const cor = 'https://geturl.deno.dev/?url=' //jeruk
    
    const sourcegempa = cor+'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml?t='+random
    const sourceerupsi = cor+'https://magma.esdm.go.id/v1/gunung-api/informasi-letusan?t='+random
    const sourcetsunami = 'https://bmkg-content-inatews.storage.googleapis.com/last30tsunamievent.xml?t='+random
    
    const [datagempa,dataerupsi,datatsunami] = await Promise.all([
      fetch(sourcegempa),
      fetch(sourceerupsi),
      fetch(sourcetsunami)
    ])
    
    //const resultgempa1 = await datagempa.text()
    //const resulterupsi = await dataerupsi.text()
    //const resulttsunami = await datatsunami.text()
    
    const resultgempa = {}
    const resulterupsi = {}
    const resulttsunami = {}
    
    await new HTMLRewriter()
    .on("Infogempa > gempa > Tanggal", {
      text(text) {
        if(resultgempa.tanggal == undefined)resultgempa.tanggal = text.text
      }
    })
    .on("Infogempa > gempa > Jam", {
      text(text) {
        if(resultgempa.jam == undefined)resultgempa.jam = text.text
      }
    })
    .on("Infogempa > gempa > DateTime", {
      text(text) {
        if(resultgempa.datetime == undefined)resultgempa.datetime = text.text
      }
    })
    .on("Infogempa > gempa > point > coordinates", {
      text(text) {
        if(resultgempa.coordinates == undefined)resultgempa.coordinates = text.text
      }
    })
    .on("Infogempa > gempa > Lintang", {
      text(text) {
        if(resultgempa.lintang == undefined)resultgempa.lintang = text.text
      }
    })
    .on("Infogempa > gempa > Bujur", {
      text(text) {
        if(resultgempa.bujur == undefined)resultgempa.bujur = text.text
      }
    })
    .on("Infogempa > gempa > Magnitude", {
      text(text) {
        if(resultgempa.magnitude == undefined)resultgempa.magnitude = text.text
      }
    })
    .on("Infogempa > gempa > Kedalaman", {
      text(text) {
        if(resultgempa.kedalaman == undefined)resultgempa.kedalaman = text.text
      }
    })
    .on("Infogempa > gempa > Wilayah", {
      text(text) {
        if(resultgempa.wilayah == undefined)resultgempa.wilayah = text.text
      }
    })
    .on("Infogempa > gempa > Potensi", {
      text(text) {
        if(resultgempa.potensi == undefined)resultgempa.potensi = text.text
      }
    })
    .on("Infogempa > gempa > Dirasakan", {
      text(text) {
        if(resultgempa.dirasakan == undefined)resultgempa.dirasakan = text.text
      }
    })
    .on("Infogempa > gempa > Shakemap", {
      text(text) {
        if(resultgempa.shakemap == undefined)resultgempa.shakemap = text.text
      }
    })
    .transform(datagempa).arrayBuffer();
    
    await new HTMLRewriter()
    .on("body > div.slim-mainpanel > div > div.row.row-sm.row-timeline > div.col-lg-8 > div:nth-child(3) > div.timeline-group.mg-t-20.mg-b-20 > div:nth-child(2) > div.timeline-body > p.timeline-title > a", {
      text(text) {
        if(resulterupsi.gunung == undefined)resulterupsi.gunung = text.text
      }
    })
    .on("body > div.slim-mainpanel > div > div.row.row-sm.row-timeline > div.col-lg-8 > div:nth-child(3) > div.timeline-group.mg-t-20.mg-b-20 > div:nth-child(2) > div.timeline-body > p.timeline-text", {
      text(text) {
        let laporan = text.text
        let result = laporan.replace(/^\s+|\s+$/gm,'');
        if(resulterupsi.laporan == undefined)resulterupsi.laporan = result
      }
    })
    .on("body > div.slim-mainpanel > div > div.row.row-sm.row-timeline > div.col-lg-8 > div:nth-child(3) > div.timeline-group.mg-t-20.mg-b-20 > div:nth-child(2) > div.timeline-body > div:nth-child(4) > div > a", {
      element(element) {
        if(resulterupsi.gambar == undefined)resulterupsi.gambar = element.getAttribute("href")
      }
    })
    .transform(dataerupsi).arrayBuffer();
    
    await new HTMLRewriter()
    .on("alert > info > date", {
      text(text) {
        if(resulttsunami.date == undefined)resulttsunami.date = text.text
      }
    })
    .on("alert > info > time", {
      text(text) {
        if(resulttsunami.time == undefined)resulttsunami.time = text.text
      }
    })
    .on("alert > info > eventid", {
      text(text) {
        if(resulttsunami.eventid == undefined)resulttsunami.eventid = text.text
      }
    })
    .on("alert > info > subject", {
      text(text) {
        if(resulttsunami.subject == undefined)resulttsunami.subject = text.text
      }
    })
    .on("alert > info > headline", {
      text(text) {
        if(resulttsunami.headline == undefined)resulttsunami.headline = text.text
      }
    })
    .on("alert > info > description", {
      text(text) {
        if(resulttsunami.description == undefined)resulttsunami.description = text.text
      }
    })
    .on("alert > info > shakemap", {
      text(text) {
        if(resulttsunami.shakemap == undefined)resulttsunami.shakemap = text.text
      }
    })
    .transform(datatsunami).arrayBuffer();
    
    const data = {resultgempa,resulterupsi,resulttsunami}
    return data
  }
  
  const data = await handleRequest(request)

  const hookdb = await new Hookdb()
  let bsmimobile
  try{
    console.log('db ok')
    bsmimobile = await hookdb.get("bsmimobile")
    if(bsmimobile == null){
      let defaultdata = JSON.stringify({gempa:'0',erupsi:'0',tsunami:'0'})
      await hookdb.put("bsmimobile",defaultdata)
      bsmimobile = await hookdb.get("bsmimobile")
    }
  } catch(e) {
    console.log('db error')
  }
  if(bsmimobile != undefined) bsmimobile = JSON.parse(bsmimobile)
  //bsmimobile.tsunami = '0'
  //console.log(bsmimobile)
  
  let send = false
  
  if((data.resultgempa.datetime != bsmimobile.gempa)&&(data.resultgempa.datetime != undefined)){
      bsmimobile.gempa = data.resultgempa.datetime
      data.resultgempa.status = 'send'
      send = true
      let dirasakan = ''
      if(data.resultgempa.dirasakan !='-')dirasakan = ', Dirasakan:'+data.resultgempa.dirasakan
      const img = 'https://data.bmkg.go.id/DataMKG/TEWS/'+data.resultgempa.shakemap
      const msg = 'Info Gempa Mag:'+data.resultgempa.magnitude+', Tanggal:'+data.resultgempa.tanggal+' '+data.resultgempa.jam+', Koordinat:'+data.resultgempa.coordinates+', Kedalaman:'+data.resultgempa.kedalaman+', Wilayah:'+data.resultgempa.wilayah+dirasakan+', '+data.resultgempa.potensi+' '+img
      const response = await sendtelegram("BSMIMOBILE","text",msg,"")
      data.resultgempa.telegram = response
      const channel = '948f8e4d-3b32-46f6-9b25-d732c72a3447'
      const headings = 'Gempa Bumi M '+data.resultgempa.magnitude
      const onesignal = await sendonesignalbsmimobile(channel,headings, msg)
      data.resultgempa.onesignal = onesignal
  }else{
      data.resultgempa.status = 'same'
  }

  if((data.resulterupsi.gambar != bsmimobile.erupsi)&&(data.resulterupsi.laporan != undefined)){
      bsmimobile.erupsi = data.resulterupsi.gambar
      data.resulterupsi.status = 'send'
      send = true
      let laporan = data.resulterupsi.laporan
      laporan = laporan.replace(/&plusmn;/g,"+-")
      const msg = laporan+' '+data.resulterupsi.gambar
      const response = await sendtelegram("BSMIMOBILE","text",msg,"")
      data.resulterupsi.telegram = response
      const channel = '50c71637-13a0-4cf2-a18d-d5f54f7d53a9'
      const headings = 'Erupsi G. '+data.resulterupsi.gunung
      const onesignal = await sendonesignalbsmimobile(channel,headings, msg)
      data.resulterupsi.onesignal = onesignal
  }else{
      data.resulterupsi.status = 'same'
  }

  if((data.resulttsunami.eventid != bsmimobile.tsunami)&&(data.resulttsunami.eventid != undefined)){
      bsmimobile.tsunami = data.resulttsunami.eventid
      data.resulttsunami.status = 'send'
      send = true
      const img = 'https://data.bmkg.go.id/DataMKG/TEWS/'+data.resulttsunami.shakemap
      const msg = data.resulttsunami.subject+'\n\n'+data.resulttsunami.headline+' '+img
      const response = await sendtelegram("BSMIMOBILE","text",msg,"")
      data.resulttsunami.telegram = response
      const channel = '0a7ca4ad-9a3b-4f88-acf6-7dc1ef38941d'
      const headings = data.resulttsunami.subject
      const msgtxt = data.resulttsunami.headline
      const onesignal = await sendonesignalbsmimobile(channel,headings, msgtxt)
      data.resulttsunami.onesignal = onesignal
  }else{
      data.resulttsunami.status = 'same'
  }
  
  if(send)await hookdb.put("bsmimobile",JSON.stringify(bsmimobile))
  let output = '{"status":"ok"}'
  output = JSON.stringify(data)

  const res = output
  return new Response(res, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
      //"content-type": "text/html;charset=UTF-8"
    }
  });  
}