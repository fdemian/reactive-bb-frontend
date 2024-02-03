/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateEmail($id: Int!, $email: String!) {\n    updateEmail(id: $id, email: $email)\n  }\n": types.UpdateEmailDocument,
    "\n  mutation UpdatePassword($id: Int!, $currentPass: String!, $newPass: String!) {\n    updatePassword(id: $id, currentPass: $currentPass, newPass: $newPass) {\n      ok\n    }\n  }\n": types.UpdatePasswordDocument,
    "\n  mutation UpdateProfile($id: Int!, $status: String, $about: String) {\n    updateProfile(id: $id, status: $status, about: $about) {\n      ok\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation uploadAvatar($image: Upload!, $id: Int!) {\n    uploadUserImage(image: $image, id: $id) {\n      id\n      ok\n    }\n  }\n": types.UploadAvatarDocument,
    "\n  mutation removeAvatar($id: Int!) {\n    removeUserImage(id: $id)\n  }\n": types.RemoveAvatarDocument,
    "\n  query PostEdits($limit: Int!, $offset: Int!) {\n    postEdits(limit: $limit, offset: $offset) {\n      postEdits {\n        user {\n          id\n          avatar\n          username\n        }\n        date\n        previous\n        current\n      }\n      editsCount\n    }\n  }\n": types.PostEditsDocument,
    "\n  query GetConfig {\n    config {\n      config\n      oauth\n    }\n  }\n": types.GetConfigDocument,
    "\n  query GetBookmarksByUser($user: Int!) {\n    bookmarksByUser(user: $user) {\n      id\n      post {\n        id\n        content\n        user {\n          id\n          username\n          avatar\n        }\n      }\n    }\n  }\n": types.GetBookmarksByUserDocument,
    "\n  mutation CreateCategory($name: String!, $description: String!) {\n    createCategory(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      description\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetCategory($id: Int!) {\n    category(id: $id) {\n      id\n      name\n      description\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        pinned\n        closed\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetCategoryDocument,
    "\n  query GetMentionCandidates($search: String!) {\n    mentionCandidates(search: $search) {\n      id\n      username\n      avatar\n      banned\n      banReason\n      banExpires\n    }\n  }\n": types.GetMentionCandidatesDocument,
    "\n  mutation SetMentions($link: String!, $user: String!, $mentioned: [String!]) {\n    setMentions(link: $link, user: $user, mentioned: $mentioned)\n  }\n": types.SetMentionsDocument,
    "\n  mutation UploadImage($image: Upload!) {\n    uploadImage(image: $image) {\n      src\n    }\n  }\n": types.UploadImageDocument,
    "\n  mutation SendMessage(\n    $author: Int!\n    $recipient: Int!\n    $message: JSON!\n    $newchat: Boolean!\n  ) {\n    sendMessage(\n      author: $author\n      recipient: $recipient\n      message: $message\n      newchat: $newchat\n    )\n  }\n": types.SendMessageDocument,
    "\n  query GetChatsByUser($user: Int!) {\n    chatsByUser(user: $user) {\n      id\n      avatar\n      username\n    }\n  }\n": types.GetChatsByUserDocument,
    "\n  query GetChat($userA: Int!, $userB: Int!, $offset: Int!, $limit: Int!) {\n    chat(userA: $userA, userB: $userB, offset: $offset, limit: $limit) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.GetChatDocument,
    "\n  subscription ChatAdded($userA: Int!, $userB: Int!) {\n    chatAdded(userA: $userA, userB: $userB) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.ChatAddedDocument,
    "\n  mutation BanUser($user: Int!, $expires: Datetime, $reason: String!) {\n    banUser(user: $user, expires: $expires, reason: $reason)\n  }\n": types.BanUserDocument,
    "\n  mutation RemoveUserBan($user: Int!) {\n    removeUserBan(user: $user)\n  }\n": types.RemoveUserBanDocument,
    "\n  query GetFlaggedPosts($offset: Int!, $limit: Int!) {\n    flaggedPosts(offset: $offset, limit: $limit) {\n      postId\n      userId\n      reasonId\n      reasonText\n    }\n  }\n": types.GetFlaggedPostsDocument,
    "\n  mutation RemoveFlag($post: Int!, $user: Int!) {\n    removeFlag(post: $post, user: $user) {\n      postId\n      userId\n    }\n  }\n": types.RemoveFlagDocument,
    "\n  query Notifications($user: Int!) {\n    notifications(user: $user) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.NotificationsDocument,
    "\n  subscription NotificationAdded($user: Int!) {\n    notificationAdded(user: $user) {\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.NotificationAddedDocument,
    "\n  subscription ChatNotification($user: Int!) {\n    chatNotification(user: $user) {\n      read\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.ChatNotificationDocument,
    "\n  mutation MarkNotificationsRead($notifications: [Int!]) {\n    markNotificationsRead(notifications: $notifications)\n  }\n": types.MarkNotificationsReadDocument,
    "\n  mutation CreateTopic(\n    $user: Int!\n    $name: String!\n    $content: String!\n    $category: Int\n    $tags: String\n  ) {\n    createTopic(\n      user: $user\n      name: $name\n      content: $content\n      category: $category\n      tags: $tags\n    ) {\n      id\n      ok\n    }\n  }\n": types.CreateTopicDocument,
    "\n  query AllNotifications($user: Int!, $limit: Int!, $offset: Int!) {\n    allNotifications(user: $user, limit: $limit, offset: $offset) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.AllNotificationsDocument,
    "\n  query GetPositionId($post: Int!, $itemscount: Int!) {\n    postLink(post: $post, itemscount: $itemscount) {\n      topicId\n      page\n      name\n    }\n  }\n": types.GetPositionIdDocument,
    "\n  mutation AddPost($user: Int!, $topic: Int!, $content: JSON!) {\n    createPost(user: $user, topic: $topic, content: $content) {\n      content\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n": types.AddPostDocument,
    "\n  mutation IncreaseViewCount($topic: Int!) {\n    increaseViewCount(topic: $topic) {\n      id\n      ok\n    }\n  }\n": types.IncreaseViewCountDocument,
    "\n  mutation FlagPost($post: Int!, $user: Int!, $reason: Int!, $text: String) {\n    flagPost(post: $post, user: $user, reason: $reason, text: $text)\n  }\n": types.FlagPostDocument,
    "\n  mutation LikePost($user: Int!, $originator: Int!, $topic: Int!, $post: Int!) {\n    likePost(user: $user, originator: $originator, topic: $topic, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n": types.LikePostDocument,
    "\n  mutation RemoveLike($user: Int!, $post: Int!) {\n    removeLike(user: $user, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n": types.RemoveLikeDocument,
    "\n  mutation BookmarkPost($user: Int!, $post: Int!) {\n    bookmarkPost(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n": types.BookmarkPostDocument,
    "\n  mutation RemoveBookmark($user: Int!, $post: Int!) {\n    removeBookmark(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n": types.RemoveBookmarkDocument,
    "\n  mutation CloseTopic($topic: Int!) {\n    closeTopic(topic: $topic)\n  }\n": types.CloseTopicDocument,
    "\n  mutation DeleteTopic($topic: Int!) {\n    deleteTopic(topic: $topic)\n  }\n": types.DeleteTopicDocument,
    "\n  mutation ReopenTopic($topic: Int!) {\n    reopenTopic(topic: $topic)\n  }\n": types.ReopenTopicDocument,
    "\n  mutation DeletePost($post: Int!, $user: Int!) {\n    deletePost(post: $post, user: $user) {\n      ok\n      id\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation EditPost($post: Int!, $user: Int!, $content: JSON!) {\n    editPost(post: $post, user: $user, content: $content) {\n      id\n      ok\n      content\n      __typename\n    }\n  }\n": types.EditPostDocument,
    "\n  query GetTopic($id: Int!) {\n    topic(id: $id) {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      tags\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetTopicDocument,
    "\n  query GetPosts($topicId: Int!, $limit: Int!, $offset: Int!) {\n    posts(topicId: $topicId, limit: $limit, offset: $offset) {\n      id\n      content\n      edited\n      created\n      likes {\n        id\n        userId\n        postId\n      }\n      user {\n        id\n        avatar\n        username\n        status\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetBookmarksByPosts($user: Int!, $posts: [Int!]) {\n    bookmarksByPostList(user: $user, posts: $posts) {\n      id\n      userId\n      postId\n    }\n  }\n": types.GetBookmarksByPostsDocument,
    "\n  mutation CreateUser($username: String!, $password: String!, $email: String!) {\n    createUser(username: $username, password: $password, email: $email) {\n      ok\n      id\n      message\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation ValidateUser($token: String!) {\n    validateUser(token: $token) {\n      id\n      ok\n    }\n  }\n": types.ValidateUserDocument,
    "\n  query CheckUsername($username: String!) {\n    checkUsername(username: $username) {\n      exists\n    }\n  }\n": types.CheckUsernameDocument,
    "\n  mutation ResetPasswordRequest($email: String!) {\n    resetPasswordRequest(email: $email)\n  }\n": types.ResetPasswordRequestDocument,
    "\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password)\n  }\n": types.ResetPasswordDocument,
    "\n  query GetSearch(\n    $term: String!\n    $where: [String!]\n    $limit: Int!\n    $offset: Int!\n  ) {\n    search(term: $term, where: $where, limit: $limit, offset: $offset) {\n      results {\n        id\n        text\n        topicId\n        topic\n      }\n      total\n    }\n  }\n": types.GetSearchDocument,
    "\n  query GetTopics($limit: Int!, $offset: Int!) {\n    topics(limit: $limit, offset: $offset) {\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        closed\n        pinned\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n      topicsCount\n    }\n  }\n": types.GetTopicsDocument,
    "\n  query GetPinnedTopics {\n    pinnedTopics {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      pinned\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetPinnedTopicsDocument,
    "\n  mutation PinTopic($topic: Int!) {\n    pinTopic(topic: $topic)\n  }\n": types.PinTopicDocument,
    "\n  query GetUser($id: Int!) {\n    getUser(id: $id) {\n      id\n      username\n      avatar\n      type\n      fullname\n      email\n      status\n      about\n      banned\n      banExpires\n      banReason\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetLikesByUser($id: Int!) {\n    likesByUser(id: $id) {\n      id\n      post {\n        id\n        topicId\n        content\n      }\n    }\n  }\n": types.GetLikesByUserDocument,
    "\n  query GetTopicsByUser($id: Int!) {\n    topicsByUser(id: $id) {\n      id\n      name\n    }\n  }\n": types.GetTopicsByUserDocument,
    "\n  query GetPostsByUser($id: Int!) {\n    postsByUser(id: $id) {\n      id\n      content\n      topicId\n    }\n  }\n": types.GetPostsByUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateEmail($id: Int!, $email: String!) {\n    updateEmail(id: $id, email: $email)\n  }\n"): (typeof documents)["\n  mutation UpdateEmail($id: Int!, $email: String!) {\n    updateEmail(id: $id, email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePassword($id: Int!, $currentPass: String!, $newPass: String!) {\n    updatePassword(id: $id, currentPass: $currentPass, newPass: $newPass) {\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePassword($id: Int!, $currentPass: String!, $newPass: String!) {\n    updatePassword(id: $id, currentPass: $currentPass, newPass: $newPass) {\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProfile($id: Int!, $status: String, $about: String) {\n    updateProfile(id: $id, status: $status, about: $about) {\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($id: Int!, $status: String, $about: String) {\n    updateProfile(id: $id, status: $status, about: $about) {\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation uploadAvatar($image: Upload!, $id: Int!) {\n    uploadUserImage(image: $image, id: $id) {\n      id\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation uploadAvatar($image: Upload!, $id: Int!) {\n    uploadUserImage(image: $image, id: $id) {\n      id\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removeAvatar($id: Int!) {\n    removeUserImage(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeAvatar($id: Int!) {\n    removeUserImage(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PostEdits($limit: Int!, $offset: Int!) {\n    postEdits(limit: $limit, offset: $offset) {\n      postEdits {\n        user {\n          id\n          avatar\n          username\n        }\n        date\n        previous\n        current\n      }\n      editsCount\n    }\n  }\n"): (typeof documents)["\n  query PostEdits($limit: Int!, $offset: Int!) {\n    postEdits(limit: $limit, offset: $offset) {\n      postEdits {\n        user {\n          id\n          avatar\n          username\n        }\n        date\n        previous\n        current\n      }\n      editsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetConfig {\n    config {\n      config\n      oauth\n    }\n  }\n"): (typeof documents)["\n  query GetConfig {\n    config {\n      config\n      oauth\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBookmarksByUser($user: Int!) {\n    bookmarksByUser(user: $user) {\n      id\n      post {\n        id\n        content\n        user {\n          id\n          username\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookmarksByUser($user: Int!) {\n    bookmarksByUser(user: $user) {\n      id\n      post {\n        id\n        content\n        user {\n          id\n          username\n          avatar\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($name: String!, $description: String!) {\n    createCategory(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!, $description: String!) {\n    createCategory(name: $name, description: $description) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategory($id: Int!) {\n    category(id: $id) {\n      id\n      name\n      description\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        pinned\n        closed\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategory($id: Int!) {\n    category(id: $id) {\n      id\n      name\n      description\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        pinned\n        closed\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMentionCandidates($search: String!) {\n    mentionCandidates(search: $search) {\n      id\n      username\n      avatar\n      banned\n      banReason\n      banExpires\n    }\n  }\n"): (typeof documents)["\n  query GetMentionCandidates($search: String!) {\n    mentionCandidates(search: $search) {\n      id\n      username\n      avatar\n      banned\n      banReason\n      banExpires\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetMentions($link: String!, $user: String!, $mentioned: [String!]) {\n    setMentions(link: $link, user: $user, mentioned: $mentioned)\n  }\n"): (typeof documents)["\n  mutation SetMentions($link: String!, $user: String!, $mentioned: [String!]) {\n    setMentions(link: $link, user: $user, mentioned: $mentioned)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UploadImage($image: Upload!) {\n    uploadImage(image: $image) {\n      src\n    }\n  }\n"): (typeof documents)["\n  mutation UploadImage($image: Upload!) {\n    uploadImage(image: $image) {\n      src\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage(\n    $author: Int!\n    $recipient: Int!\n    $message: JSON!\n    $newchat: Boolean!\n  ) {\n    sendMessage(\n      author: $author\n      recipient: $recipient\n      message: $message\n      newchat: $newchat\n    )\n  }\n"): (typeof documents)["\n  mutation SendMessage(\n    $author: Int!\n    $recipient: Int!\n    $message: JSON!\n    $newchat: Boolean!\n  ) {\n    sendMessage(\n      author: $author\n      recipient: $recipient\n      message: $message\n      newchat: $newchat\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChatsByUser($user: Int!) {\n    chatsByUser(user: $user) {\n      id\n      avatar\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetChatsByUser($user: Int!) {\n    chatsByUser(user: $user) {\n      id\n      avatar\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChat($userA: Int!, $userB: Int!, $offset: Int!, $limit: Int!) {\n    chat(userA: $userA, userB: $userB, offset: $offset, limit: $limit) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChat($userA: Int!, $userB: Int!, $offset: Int!, $limit: Int!) {\n    chat(userA: $userA, userB: $userB, offset: $offset, limit: $limit) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription ChatAdded($userA: Int!, $userB: Int!) {\n    chatAdded(userA: $userA, userB: $userB) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription ChatAdded($userA: Int!, $userB: Int!) {\n    chatAdded(userA: $userA, userB: $userB) {\n      date\n      content\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation BanUser($user: Int!, $expires: Datetime, $reason: String!) {\n    banUser(user: $user, expires: $expires, reason: $reason)\n  }\n"): (typeof documents)["\n  mutation BanUser($user: Int!, $expires: Datetime, $reason: String!) {\n    banUser(user: $user, expires: $expires, reason: $reason)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveUserBan($user: Int!) {\n    removeUserBan(user: $user)\n  }\n"): (typeof documents)["\n  mutation RemoveUserBan($user: Int!) {\n    removeUserBan(user: $user)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFlaggedPosts($offset: Int!, $limit: Int!) {\n    flaggedPosts(offset: $offset, limit: $limit) {\n      postId\n      userId\n      reasonId\n      reasonText\n    }\n  }\n"): (typeof documents)["\n  query GetFlaggedPosts($offset: Int!, $limit: Int!) {\n    flaggedPosts(offset: $offset, limit: $limit) {\n      postId\n      userId\n      reasonId\n      reasonText\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveFlag($post: Int!, $user: Int!) {\n    removeFlag(post: $post, user: $user) {\n      postId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveFlag($post: Int!, $user: Int!) {\n    removeFlag(post: $post, user: $user) {\n      postId\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Notifications($user: Int!) {\n    notifications(user: $user) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query Notifications($user: Int!) {\n    notifications(user: $user) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription NotificationAdded($user: Int!) {\n    notificationAdded(user: $user) {\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription NotificationAdded($user: Int!) {\n    notificationAdded(user: $user) {\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription ChatNotification($user: Int!) {\n    chatNotification(user: $user) {\n      read\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription ChatNotification($user: Int!) {\n    chatNotification(user: $user) {\n      read\n      author {\n        id\n        avatar\n        username\n      }\n      recipient {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkNotificationsRead($notifications: [Int!]) {\n    markNotificationsRead(notifications: $notifications)\n  }\n"): (typeof documents)["\n  mutation MarkNotificationsRead($notifications: [Int!]) {\n    markNotificationsRead(notifications: $notifications)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTopic(\n    $user: Int!\n    $name: String!\n    $content: String!\n    $category: Int\n    $tags: String\n  ) {\n    createTopic(\n      user: $user\n      name: $name\n      content: $content\n      category: $category\n      tags: $tags\n    ) {\n      id\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTopic(\n    $user: Int!\n    $name: String!\n    $content: String!\n    $category: Int\n    $tags: String\n  ) {\n    createTopic(\n      user: $user\n      name: $name\n      content: $content\n      category: $category\n      tags: $tags\n    ) {\n      id\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllNotifications($user: Int!, $limit: Int!, $offset: Int!) {\n    allNotifications(user: $user, limit: $limit, offset: $offset) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllNotifications($user: Int!, $limit: Int!, $offset: Int!) {\n    allNotifications(user: $user, limit: $limit, offset: $offset) {\n      id\n      link\n      type\n      read\n      originator {\n        id\n        avatar\n        username\n      }\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPositionId($post: Int!, $itemscount: Int!) {\n    postLink(post: $post, itemscount: $itemscount) {\n      topicId\n      page\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetPositionId($post: Int!, $itemscount: Int!) {\n    postLink(post: $post, itemscount: $itemscount) {\n      topicId\n      page\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddPost($user: Int!, $topic: Int!, $content: JSON!) {\n    createPost(user: $user, topic: $topic, content: $content) {\n      content\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddPost($user: Int!, $topic: Int!, $content: JSON!) {\n    createPost(user: $user, topic: $topic, content: $content) {\n      content\n      user {\n        id\n        avatar\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation IncreaseViewCount($topic: Int!) {\n    increaseViewCount(topic: $topic) {\n      id\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation IncreaseViewCount($topic: Int!) {\n    increaseViewCount(topic: $topic) {\n      id\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation FlagPost($post: Int!, $user: Int!, $reason: Int!, $text: String) {\n    flagPost(post: $post, user: $user, reason: $reason, text: $text)\n  }\n"): (typeof documents)["\n  mutation FlagPost($post: Int!, $user: Int!, $reason: Int!, $text: String) {\n    flagPost(post: $post, user: $user, reason: $reason, text: $text)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LikePost($user: Int!, $originator: Int!, $topic: Int!, $post: Int!) {\n    likePost(user: $user, originator: $originator, topic: $topic, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n"): (typeof documents)["\n  mutation LikePost($user: Int!, $originator: Int!, $topic: Int!, $post: Int!) {\n    likePost(user: $user, originator: $originator, topic: $topic, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveLike($user: Int!, $post: Int!) {\n    removeLike(user: $user, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveLike($user: Int!, $post: Int!) {\n    removeLike(user: $user, post: $post) {\n      id\n      ok\n      postId\n      likes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation BookmarkPost($user: Int!, $post: Int!) {\n    bookmarkPost(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation BookmarkPost($user: Int!, $post: Int!) {\n    bookmarkPost(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveBookmark($user: Int!, $post: Int!) {\n    removeBookmark(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveBookmark($user: Int!, $post: Int!) {\n    removeBookmark(user: $user, post: $post) {\n      id\n      ok\n      postId\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CloseTopic($topic: Int!) {\n    closeTopic(topic: $topic)\n  }\n"): (typeof documents)["\n  mutation CloseTopic($topic: Int!) {\n    closeTopic(topic: $topic)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTopic($topic: Int!) {\n    deleteTopic(topic: $topic)\n  }\n"): (typeof documents)["\n  mutation DeleteTopic($topic: Int!) {\n    deleteTopic(topic: $topic)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ReopenTopic($topic: Int!) {\n    reopenTopic(topic: $topic)\n  }\n"): (typeof documents)["\n  mutation ReopenTopic($topic: Int!) {\n    reopenTopic(topic: $topic)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePost($post: Int!, $user: Int!) {\n    deletePost(post: $post, user: $user) {\n      ok\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($post: Int!, $user: Int!) {\n    deletePost(post: $post, user: $user) {\n      ok\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditPost($post: Int!, $user: Int!, $content: JSON!) {\n    editPost(post: $post, user: $user, content: $content) {\n      id\n      ok\n      content\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation EditPost($post: Int!, $user: Int!, $content: JSON!) {\n    editPost(post: $post, user: $user, content: $content) {\n      id\n      ok\n      content\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTopic($id: Int!) {\n    topic(id: $id) {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      tags\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopic($id: Int!) {\n    topic(id: $id) {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      tags\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPosts($topicId: Int!, $limit: Int!, $offset: Int!) {\n    posts(topicId: $topicId, limit: $limit, offset: $offset) {\n      id\n      content\n      edited\n      created\n      likes {\n        id\n        userId\n        postId\n      }\n      user {\n        id\n        avatar\n        username\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($topicId: Int!, $limit: Int!, $offset: Int!) {\n    posts(topicId: $topicId, limit: $limit, offset: $offset) {\n      id\n      content\n      edited\n      created\n      likes {\n        id\n        userId\n        postId\n      }\n      user {\n        id\n        avatar\n        username\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBookmarksByPosts($user: Int!, $posts: [Int!]) {\n    bookmarksByPostList(user: $user, posts: $posts) {\n      id\n      userId\n      postId\n    }\n  }\n"): (typeof documents)["\n  query GetBookmarksByPosts($user: Int!, $posts: [Int!]) {\n    bookmarksByPostList(user: $user, posts: $posts) {\n      id\n      userId\n      postId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($username: String!, $password: String!, $email: String!) {\n    createUser(username: $username, password: $password, email: $email) {\n      ok\n      id\n      message\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($username: String!, $password: String!, $email: String!) {\n    createUser(username: $username, password: $password, email: $email) {\n      ok\n      id\n      message\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ValidateUser($token: String!) {\n    validateUser(token: $token) {\n      id\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation ValidateUser($token: String!) {\n    validateUser(token: $token) {\n      id\n      ok\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckUsername($username: String!) {\n    checkUsername(username: $username) {\n      exists\n    }\n  }\n"): (typeof documents)["\n  query CheckUsername($username: String!) {\n    checkUsername(username: $username) {\n      exists\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPasswordRequest($email: String!) {\n    resetPasswordRequest(email: $email)\n  }\n"): (typeof documents)["\n  mutation ResetPasswordRequest($email: String!) {\n    resetPasswordRequest(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($token: String!, $password: String!) {\n    resetPassword(token: $token, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSearch(\n    $term: String!\n    $where: [String!]\n    $limit: Int!\n    $offset: Int!\n  ) {\n    search(term: $term, where: $where, limit: $limit, offset: $offset) {\n      results {\n        id\n        text\n        topicId\n        topic\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query GetSearch(\n    $term: String!\n    $where: [String!]\n    $limit: Int!\n    $offset: Int!\n  ) {\n    search(term: $term, where: $where, limit: $limit, offset: $offset) {\n      results {\n        id\n        text\n        topicId\n        topic\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTopics($limit: Int!, $offset: Int!) {\n    topics(limit: $limit, offset: $offset) {\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        closed\n        pinned\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n      topicsCount\n    }\n  }\n"): (typeof documents)["\n  query GetTopics($limit: Int!, $offset: Int!) {\n    topics(limit: $limit, offset: $offset) {\n      topics {\n        id\n        name\n        views\n        replies\n        created\n        closed\n        pinned\n        user {\n          id\n          avatar\n          username\n        }\n        category {\n          id\n          name\n        }\n      }\n      topicsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPinnedTopics {\n    pinnedTopics {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      pinned\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPinnedTopics {\n    pinnedTopics {\n      id\n      name\n      views\n      replies\n      created\n      closed\n      pinned\n      user {\n        id\n        avatar\n        username\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PinTopic($topic: Int!) {\n    pinTopic(topic: $topic)\n  }\n"): (typeof documents)["\n  mutation PinTopic($topic: Int!) {\n    pinTopic(topic: $topic)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser($id: Int!) {\n    getUser(id: $id) {\n      id\n      username\n      avatar\n      type\n      fullname\n      email\n      status\n      about\n      banned\n      banExpires\n      banReason\n    }\n  }\n"): (typeof documents)["\n  query GetUser($id: Int!) {\n    getUser(id: $id) {\n      id\n      username\n      avatar\n      type\n      fullname\n      email\n      status\n      about\n      banned\n      banExpires\n      banReason\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLikesByUser($id: Int!) {\n    likesByUser(id: $id) {\n      id\n      post {\n        id\n        topicId\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLikesByUser($id: Int!) {\n    likesByUser(id: $id) {\n      id\n      post {\n        id\n        topicId\n        content\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTopicsByUser($id: Int!) {\n    topicsByUser(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetTopicsByUser($id: Int!) {\n    topicsByUser(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostsByUser($id: Int!) {\n    postsByUser(id: $id) {\n      id\n      content\n      topicId\n    }\n  }\n"): (typeof documents)["\n  query GetPostsByUser($id: Int!) {\n    postsByUser(id: $id) {\n      id\n      content\n      topicId\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;