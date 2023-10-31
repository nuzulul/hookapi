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
      case "infopalestina": return await handleInfopalestina(request, env)
      case "infopalestina2": return await handleInfopalestina2(request, env)
      case "infopalestina3": return await handleInfopalestina3(request, env)
      case "infopalestina4": return await handleInfopalestina4(request, env)
      case "txtfromgaza": return await handleTxtfromgaza(request, env)
      case "testing": return await handleTesting(request, env)
      default: return await handleDefault(request, env)
    }
  }
  else {
    return new Response("ok");
  }
}

async function sendtelegram(format,caption,src) {
  
  const TELEGRAM_BOT_TOKEN = myenv.API_TOKEN_TELEGRAM_NUZULUL_INFOBSMIBOT
  const chatId = myenv.TELEGRAM_CHATID_INFOPALESTINA
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

const handleDefault = async (request, env) => {
  return new Response("ok");
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
        const response = await sendtelegram("photo",title,data[i].photo)
        data[i].response = response
      }
      else if(data[i].video) {
        const response = await sendtelegram("video",title,data[i].video)
        data[i].response = response
      }
      else {
        const response = await sendtelegram("text",title,"")
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
        const response = await sendtelegram("photo",title,data[i].photo)
        data[i].response = response
      }
      else if(data[i].video) {
        const response = await sendtelegram("video",title,data[i].video)
        data[i].response = response
      }
      else {
        //const response = await sendtelegram("text",title,"")
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
      let translateid = await translatetext("ar","id",title)
      translateid = translateid.replace("#Shehab:","")
      translateid = translateid.replace("#Shehab","")
      translateid = translateid.replace("Shehab","")
      translateid = translateid.replace("Koresponden","")      
      if(translateid == "error") {continue}else{data[i].translate = translateid}
      if(translateid.includes("Ibrani"))continue
      if(translateid.startsWith("Mendesak"))translateid = translateid.replace("Mendesak","Terkini")      
      if(data[i].photo) {
        const response = await sendtelegram("photo",translateid,data[i].photo)
        data[i].response = response
      }
      else if(data[i].video) {
        const response = await sendtelegram("video",translateid,data[i].video)
        data[i].response = response
      }
      else {
        continue
        //const response = await sendtelegram("text",title,"")
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
          const response = await sendtelegram("photo",translateid,breakingimg)
          data[i].response = response
        } else {continue}
      }
      else if(data[i].video) {
        const response = await sendtelegram("video",translateid,data[i].video)
        data[i].response = response
      }
      else {
        let mytitle = data[i].title || ""
        if (mytitle.includes("Breaking")) {
          translateid = "Breaking News "+translateid
          const response = await sendtelegram("photo",translateid,breakingimg)
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