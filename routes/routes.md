(r'/api/user/login', LoginHandler),

(r'/api/friend_timeline', FriendTimeLineHandler),

(r'/api/user_timeline', UserTimeLineHandler),

(r'/api/user/tag_timeline', UserTagTimeLineHandler),

(r'/api/tag_timeline', TagTimeLineHandler),

(r'/api/following', FollowingHandler),

(r'/api/followers', FollowersHandler),

(r'/api/follow', FollowHandler),

(r'/api/logout', LogoutHandler),

(r'/api/like_list', LikeListHandler),

(r'/api/like', LikeHandler),

(r'/api/photo', PhotoHandler),

分割线
==============================


(r'/api/topic_timeline', TopicTimelineHandler),

(r'/api/comment', CommentHandler),

(r'/api/comment_list', CommentListHandler),

(r'/api/tag/users', TagUsers),

(r'/api/taglist', TagListHandler),

(r'/api/discovery', DiscoveryHandler),

(r'/api/search', SearchHandler),

(r'/api/sidebar', SidebarHandler),



(r'/', TimeLineRenderHandler),

(r'/user/login', LoginRenderHandler),

(r'/user/sina_login', SinaLoginRenderHandler),

(r'/user/password', PasswordRenderHandler),

(r'/user/info', InfoRenderHandler),

(r'/user/feedback', FeedBackRenderHandler),

(r'/user/find', FindPasswordRenderHandler),

(r'/user/reset', ResetPasswordRenderHandler),

(r'/app/home', HomeRenderHandler),

(r'/app/discovery', DiscoveryRenderHandler),

(r'/app/upload', UploadHandler),

(r'/app/search', SearchRenderHandler),

(r'/app/notify', NotifyRenderHandler),

(r'/app/notify/choice', NotifyChoiceRenderHandler),

(r'^/app/notify/send-(?P<send_id>\d+)$', NotifySendRenderHandler),

(r'/app/notify/search', NotifySearchRenderHandler),

(r'/app/hot', HotRenderHandler),

(r'/app/clause', ClauseHandler),

(r'^/(?P<owner_id>[a-zA-Z0-9]+)$', ProfileRenderHandler),

(r'^/(?P<owner_id>\d+)/photo-(?P<photo_id>\d+)$', PhotoRenderHandler),

(r'^/(?P<owner_id>\d+)/tag-(?P<tag_id>\d+)$', UserTagRenderHandler),

(r'^/tag-(?P<tag_id>\d+)$', TagRenderHandler),

(r'^/topic-(?P<topic_id>\d+)$', TopicRenderHandler),

(r'^/location-(?P<tag_id>\d+)$', LocationRenderHandler)

(r'/api/upload/imm', ReleaseImmediatelyHandler),

(r'/api/upload/with', WithFriendHandler),

(r'/api/upload/friend', KeywordFriendHandler),

(r'/api/upload/tag', KeywordTagHandler),

(r'/api/upload/create_tag', CreateTagHandler),

(r'/api/update/password', UpdatePasswordHandler),

(r'/api/update/info', UpdateInfoHandler),

(r'/api/upload_apply', UploadApplyHandler),

(r'/api/feedback', FeedBackHandler),

(r'/api/notify', NotifyHandler),

(r'/api/notify/friend_list', FriendNotifyListHandler),

(r'/api/notify/letter_list', LetterNotifyListHandler),

(r'/api/notify/reset', NotifyResetHandler),

(r'/api/notify/list', NotifyListHandler),

(r'/api/notify/send/letter', SendLetterHandler),

(r'/api/notify/search', NotifySearchHandler),

(r'/api/find_password', FindPasswordHandler),

(r'/api/reset_password', ResetPasswordHandler),

