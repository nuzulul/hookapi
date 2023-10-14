/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		return await handleRequest(request, env, ctx)
	},
};

async function handleRequest(request, env, ctx) {
    const { method, url } = request
    const { searchParams } = new URL(url)
    const id = searchParams.get('id')
    switch(method) {
        case "GET": return await handleGet(request, env, id)
    }
}

const handleGet = async (request, env, id) => {
  if (id) {
    switch(id) {
      case "infopalestina": return await handleInfopalestina(request, env)
    }
  }
  else {
    return new Response("ok");
  }
}


const handleInfopalestina = async (request, env) => {

  addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
  });

  async function handleRequest(request) {
    var values = [];
    var url = "https://t.me/s/SahabatPalestinaID"
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
        },
        text(text) {
          addToLast('body', text.text);
        }
      })
      .on(".tgme_widget_message_wrap .tgme_widget_message", {
        element(element) {
          addToLast('code', element.getAttribute("data-post"));
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
    const json = JSON.stringify(values, null, 2)
    return json
  }
  const json = await handleRequest(request)
  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  });  
}