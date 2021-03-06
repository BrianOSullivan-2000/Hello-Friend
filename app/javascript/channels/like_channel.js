import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const acc_element = document.getElementById('acc_id');
  const acc_id = acc_element.getAttribute('data-acc-id');

  consumer.subscriptions.create({ channel: "LikeChannel", account_id: acc_id}, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("connected to like channel "+ acc_id);
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data);
      const my_project_conversations = document.getElementById("proj"+data.project_id);

      var extra_html="<p class='card-text'>"
      extra_html+="<a href='/profiles/"+data.profile_id+"'>@"+data.name+"</a> | "
      extra_html+="<span id=swipe"+data.swipe_id+">No messages. </span>"
      extra_html+="<a href='/swipes/"+data.swipe_id+"'>Message</a></p>"

      my_project_conversations.innerHTML+=extra_html
    }
  });

})
