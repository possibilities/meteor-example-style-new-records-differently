Comments = new Meteor.Collection('comments');

StyleNewRecords = {};

if (Meteor.is_client) {

  Template.comments.helpers({
    comments: function() {
      return Comments.find();
    }
  });
  
  Template.comment.helpers({
    isNew: function() {
      return (new Date(this.createdAt)) > StyleNewRecords;
    }
  });
  
  Meteor.subscribe('comments', function() {
    StyleNewRecords = new Date();
  });
}

if (Meteor.is_server) {

  Comments.remove({});

  var newComment = function() {
    Comments.insert({
      name: "Comment" + (Comments.find().count() + 1),
      createdAt: new Date()
    });
  };

  _.each(_.range(5), function() {
    newComment();
  });

  Meteor.setInterval(function() {
    newComment();
  }, 3000);
  
  Meteor.publish('comments', function() {
    return Comments.find();
  });
}
