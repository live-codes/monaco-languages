import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* ===================================================================
   DOCUMENTATION DATABASE
   =================================================================== */
  const DOCS = {
    "erlang:abs": {
      sig: "abs(Number) -> number()",
      desc: "Returns the arithmetical absolute value of `Number`.",
    },
    "erlang:apply": {
      sig: "apply(Module, Function, Args) -> term()",
      desc: "Calls `Function` in `Module` with `Args`. Equivalent to `Module:Function(Arg1, ..., ArgN)`.",
    },
    "erlang:atom_to_list": {
      sig: "atom_to_list(Atom) -> string()",
      desc: "Returns a string corresponding to the text representation of `Atom`.",
    },
    "erlang:atom_to_binary": {
      sig: "atom_to_binary(Atom) -> binary()",
      desc: "Returns a binary corresponding to the text representation of `Atom`.",
    },
    "erlang:binary_to_list": {
      sig: "binary_to_list(Binary) -> [byte()]",
      desc: "Converts a binary to a list of bytes.",
    },
    "erlang:binary_to_term": {
      sig: "binary_to_term(Binary) -> term()",
      desc: "Returns an Erlang term decoded from `Binary`.",
    },
    "erlang:byte_size": {
      sig: "byte_size(Bitstring) -> non_neg_integer()",
      desc: "Returns the number of bytes needed to contain `Bitstring`.",
    },
    "erlang:element": {
      sig: "element(N, Tuple) -> term()",
      desc: "Returns the `N`-th element (1-indexed) of `Tuple`.",
    },
    "erlang:error": {
      sig: "error(Reason) -> no_return()",
      desc: "Raises an error exception with reason `Reason`. The stack trace is included.",
    },
    "erlang:exit": {
      sig: "exit(Reason) -> no_return()",
      desc: "Raises an exit exception with reason `Reason`.",
    },
    "erlang:float": {
      sig: "float(Number) -> float()",
      desc: "Converts `Number` to a floating-point number.",
    },
    "erlang:hd": {
      sig: "hd(List) -> term()",
      desc: "Returns the head (first element) of `List`.",
    },
    "erlang:integer_to_list": {
      sig: "integer_to_list(Integer) -> string()",
      desc: "Returns the string representation of `Integer`.",
    },
    "erlang:is_alive": {
      sig: "is_alive() -> boolean()",
      desc: "Returns `true` if the local node is alive (part of a distributed system).",
    },
    "erlang:is_atom": {
      sig: "is_atom(Term) -> boolean()",
      desc: "Returns `true` if `Term` is an atom, otherwise `false`. Allowed in guard tests.",
    },
    "erlang:is_binary": {
      sig: "is_binary(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a binary, otherwise `false`. Allowed in guard tests.",
    },
    "erlang:is_boolean": {
      sig: "is_boolean(Term) -> boolean()",
      desc: "Returns `true` if `Term` is `true` or `false`.",
    },
    "erlang:is_float": {
      sig: "is_float(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a floating-point number.",
    },
    "erlang:is_function": {
      sig: "is_function(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a fun (function object).",
    },
    "erlang:is_integer": {
      sig: "is_integer(Term) -> boolean()",
      desc: "Returns `true` if `Term` is an integer. Allowed in guard tests.",
    },
    "erlang:is_list": {
      sig: "is_list(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a list (including `[]`). Allowed in guard tests.",
    },
    "erlang:is_map": {
      sig: "is_map(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a map.",
    },
    "erlang:is_map_key": {
      sig: "is_map_key(Key, Map) -> boolean()",
      desc: "Returns `true` if `Key` exists in `Map`. Allowed in guard tests.",
    },
    "erlang:is_number": {
      sig: "is_number(Term) -> boolean()",
      desc: "Returns `true` if `Term` is an integer or float.",
    },
    "erlang:is_pid": {
      sig: "is_pid(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a process identifier.",
    },
    "erlang:is_port": {
      sig: "is_port(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a port identifier.",
    },
    "erlang:is_record": {
      sig: "is_record(Term, RecordTag) -> boolean()",
      desc: "Returns `true` if `Term` is a record with tag `RecordTag`.",
    },
    "erlang:is_reference": {
      sig: "is_reference(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a reference.",
    },
    "erlang:is_tuple": {
      sig: "is_tuple(Term) -> boolean()",
      desc: "Returns `true` if `Term` is a tuple.",
    },
    "erlang:length": {
      sig: "length(List) -> non_neg_integer()",
      desc: "Returns the length of `List`. Allowed in guard tests.",
    },
    "erlang:link": {
      sig: "link(PidOrPort) -> true",
      desc: "Creates a link between the calling process and `PidOrPort`.",
    },
    "erlang:list_to_atom": {
      sig: "list_to_atom(String) -> atom()",
      desc: "Returns the atom whose text representation is `String`.",
    },
    "erlang:list_to_binary": {
      sig: "list_to_binary(IoList) -> binary()",
      desc: "Converts `IoList` to a binary.",
    },
    "erlang:list_to_integer": {
      sig: "list_to_integer(String) -> integer()",
      desc: "Returns the integer whose text representation is `String`.",
    },
    "erlang:list_to_tuple": {
      sig: "list_to_tuple(List) -> tuple()",
      desc: "Converts `List` to a tuple.",
    },
    "erlang:make_ref": {
      sig: "make_ref() -> reference()",
      desc: "Returns an almost unique reference. References are unique among connected nodes.",
    },
    "erlang:map_size": {
      sig: "map_size(Map) -> non_neg_integer()",
      desc: "Returns the number of key-value pairs in `Map`. Allowed in guard tests.",
    },
    "erlang:max": {
      sig: "max(Term1, Term2) -> term()",
      desc: "Returns the largest of `Term1` and `Term2` using Erlang term ordering.",
    },
    "erlang:min": {
      sig: "min(Term1, Term2) -> term()",
      desc: "Returns the smallest of `Term1` and `Term2` using Erlang term ordering.",
    },
    "erlang:monitor": {
      sig: "monitor(Type, Item) -> MonitorRef",
      desc: "Starts monitoring `Item`. `Type` is typically `process`.",
    },
    "erlang:node": {
      sig: "node() -> Node",
      desc: "Returns the name of the local node. Allowed in guard tests.",
    },
    "erlang:now": {
      sig: "now() -> {MegaSecs, Secs, MicroSecs}",
      desc: "**Deprecated.** Use `erlang:monotonic_time/0` or `os:system_time/0` instead.",
    },
    "erlang:process_flag": {
      sig: "process_flag(Flag, Value) -> OldValue",
      desc: "Sets the given process flag for the calling process. Common flags: `trap_exit`, `priority`.",
    },
    "erlang:process_info": {
      sig: "process_info(Pid) -> [{Item, Info}]",
      desc: "Returns a list containing miscellaneous information about process `Pid`.",
    },
    "erlang:put": {
      sig: "put(Key, Val) -> OldVal | undefined",
      desc: "Adds or updates `{Key, Val}` in the process dictionary. Returns the old value or `undefined`.",
    },
    "erlang:get": {
      sig: "get(Key) -> Val | undefined",
      desc: "Returns the value associated with `Key` in the process dictionary, or `undefined`.",
    },
    "erlang:register": {
      sig: "register(RegName, PidOrPort) -> true",
      desc: "Registers the name `RegName` with a pid or port.",
    },
    "erlang:round": {
      sig: "round(Number) -> integer()",
      desc: "Returns the closest integer to `Number`. Allowed in guard tests.",
    },
    "erlang:self": {
      sig: "self() -> pid()",
      desc: "Returns the pid of the calling process. Allowed in guard tests.",
    },
    "erlang:send": {
      sig: "send(Dest, Msg) -> Msg",
      desc: "Sends message `Msg` to `Dest`. Equivalent to `Dest ! Msg`.",
    },
    "erlang:setelement": {
      sig: "setelement(Index, Tuple1, Value) -> Tuple2",
      desc: "Returns a new tuple with element at `Index` replaced by `Value`.",
    },
    "erlang:size": {
      sig: "size(Item) -> non_neg_integer()",
      desc: "Returns the size of a tuple or binary. Use `tuple_size/1` or `byte_size/1` instead.",
    },
    "erlang:spawn": {
      sig: "spawn(Fun) -> pid()",
      desc: "Creates a new process that evaluates `Fun`. Returns the pid.",
    },
    "erlang:spawn_link": {
      sig: "spawn_link(Fun) -> pid()",
      desc: "Like `spawn/1` but also creates a link between the calling process and the new process.",
    },
    "erlang:spawn_monitor": {
      sig: "spawn_monitor(Fun) -> {pid(), reference()}",
      desc: "Like `spawn/1` but also creates a monitor from the calling process to the new process.",
    },
    "erlang:term_to_binary": {
      sig: "term_to_binary(Term) -> binary()",
      desc: "Encodes `Term` into an external binary format.",
    },
    "erlang:throw": {
      sig: "throw(Any) -> no_return()",
      desc: "Raises a throw exception. Can be caught with `try...catch throw:Any`.",
    },
    "erlang:tl": {
      sig: "tl(List) -> Tail",
      desc: "Returns the tail of `List` (everything except the first element).",
    },
    "erlang:trunc": {
      sig: "trunc(Number) -> integer()",
      desc: "Truncates `Number` to an integer. Allowed in guard tests.",
    },
    "erlang:tuple_size": {
      sig: "tuple_size(Tuple) -> non_neg_integer()",
      desc: "Returns the number of elements in `Tuple`. Allowed in guard tests.",
    },
    "erlang:tuple_to_list": {
      sig: "tuple_to_list(Tuple) -> [term()]",
      desc: "Converts `Tuple` to a list.",
    },
    "erlang:unlink": {
      sig: "unlink(Id) -> true",
      desc: "Removes the link between the calling process and `Id`.",
    },
    "erlang:unregister": {
      sig: "unregister(RegName) -> true",
      desc: "Removes the registered name `RegName`.",
    },
    "erlang:whereis": {
      sig: "whereis(RegName) -> pid() | port() | undefined",
      desc: "Returns the pid or port registered as `RegName`, or `undefined`.",
    },

    "io:format": {
      sig: "format(Format) -> ok | format(Format, Data) -> ok",
      desc: "Writes formatted output to standard output.\n\nFormat control sequences: `~p` (pretty print), `~w` (write term), `~s` (string), `~n` (newline), `~B` (integer), `~f` (float), `~e` (scientific), `~i` (ignore).",
    },
    "io:fwrite": {
      sig: "fwrite(Format, Data) -> ok",
      desc: "Same as `io:format/2`.",
    },
    "io:get_line": {
      sig: "get_line(Prompt) -> Data | eof",
      desc: "Reads a line from standard input, prompting with `Prompt`.",
    },
    "io:read": {
      sig: "read(Prompt) -> {ok, Term} | {error, ErrorInfo} | eof",
      desc: "Reads an Erlang term from standard input.",
    },
    "io:nl": {
      sig: "nl() -> ok",
      desc: "Writes a newline to standard output.",
    },
    "io:put_chars": {
      sig: "put_chars(CharData) -> ok",
      desc: "Writes `CharData` to standard output.",
    },

    "lists:all": {
      sig: "all(Pred, List) -> boolean()",
      desc: "Returns `true` if `Pred(Elem)` returns `true` for all elements in `List`.",
    },
    "lists:any": {
      sig: "any(Pred, List) -> boolean()",
      desc: "Returns `true` if `Pred(Elem)` returns `true` for at least one element in `List`.",
    },
    "lists:append": {
      sig: "append(List1, List2) -> List3",
      desc: "Appends `List2` to `List1`. Equivalent to `List1 ++ List2`.",
    },
    "lists:delete": {
      sig: "delete(Elem, List1) -> List2",
      desc: "Returns a copy of `List1` with the first occurrence of `Elem` removed.",
    },
    "lists:dropwhile": {
      sig: "dropwhile(Pred, List1) -> List2",
      desc: "Drops leading elements from `List1` while `Pred` returns `true`.",
    },
    "lists:duplicate": {
      sig: "duplicate(N, Elem) -> List",
      desc: "Returns a list of `N` copies of `Elem`.",
    },
    "lists:filter": {
      sig: "filter(Pred, List1) -> List2",
      desc: "Returns elements of `List1` for which `Pred` returns `true`.",
    },
    "lists:filtermap": {
      sig: "filtermap(Fun, List1) -> List2",
      desc: "Filters and maps simultaneously. `Fun` returns `true`, `false`, or `{true, Value}`.",
    },
    "lists:flatten": {
      sig: "flatten(DeepList) -> List",
      desc: "Returns a flattened version of `DeepList`.",
    },
    "lists:foldl": {
      sig: "foldl(Fun, Acc0, List) -> Acc1",
      desc: "Folds `Fun(Elem, AccIn)` over `List` from left to right, starting with `Acc0`.",
    },
    "lists:foldr": {
      sig: "foldr(Fun, Acc0, List) -> Acc1",
      desc: "Like `foldl/3` but processes the list from right to left.",
    },
    "lists:foreach": {
      sig: "foreach(Fun, List) -> ok",
      desc: "Calls `Fun(Elem)` for each element in `List`. Returns `ok`.",
    },
    "lists:keydelete": {
      sig: "keydelete(Key, N, TupleList1) -> TupleList2",
      desc: "Deletes the first tuple whose `N`-th element equals `Key`.",
    },
    "lists:keyfind": {
      sig: "keyfind(Key, N, TupleList) -> Tuple | false",
      desc: "Finds the first tuple whose `N`-th element equals `Key`, or returns `false`.",
    },
    "lists:keymember": {
      sig: "keymember(Key, N, TupleList) -> boolean()",
      desc: "Returns `true` if any tuple's `N`-th element equals `Key`.",
    },
    "lists:keyreplace": {
      sig: "keyreplace(Key, N, TupleList1, NewTuple) -> TupleList2",
      desc: "Replaces the first tuple whose `N`-th element equals `Key` with `NewTuple`.",
    },
    "lists:keysort": {
      sig: "keysort(N, TupleList1) -> TupleList2",
      desc: "Sorts `TupleList1` by the `N`-th element of each tuple. Stable sort.",
    },
    "lists:last": {
      sig: "last(List) -> Last",
      desc: "Returns the last element of `List`.",
    },
    "lists:map": {
      sig: "map(Fun, List1) -> List2",
      desc: "Applies `Fun` to every element of `List1`, returning a new list.",
    },
    "lists:max": {
      sig: "max(List) -> Max",
      desc: "Returns the maximum element of `List` using Erlang term ordering.",
    },
    "lists:member": {
      sig: "member(Elem, List) -> boolean()",
      desc: "Returns `true` if `Elem` matches some element of `List`.",
    },
    "lists:merge": {
      sig: "merge(List1, List2) -> List3",
      desc: "Merges two sorted lists into one sorted list.",
    },
    "lists:min": {
      sig: "min(List) -> Min",
      desc: "Returns the minimum element of `List`.",
    },
    "lists:nth": {
      sig: "nth(N, List) -> Elem",
      desc: "Returns the `N`-th element (1-indexed) of `List`.",
    },
    "lists:partition": {
      sig: "partition(Pred, List) -> {Satisfying, NotSatisfying}",
      desc: "Partitions `List` into two lists based on `Pred`.",
    },
    "lists:reverse": {
      sig: "reverse(List1) -> List2",
      desc: "Returns `List1` in reverse order.",
    },
    "lists:seq": {
      sig: "seq(From, To) -> [integer()]",
      desc: "Returns a list of integers from `From` to `To` (inclusive).",
    },
    "lists:sort": {
      sig: "sort(List1) -> List2",
      desc: "Returns a sorted list. Uses Erlang term ordering.",
    },
    "lists:split": {
      sig: "split(N, List1) -> {List2, List3}",
      desc: "Splits `List1` into first `N` elements and the rest.",
    },
    "lists:sublist": {
      sig: "sublist(List1, Len) -> List2",
      desc: "Returns the first `Len` elements of `List1`.",
    },
    "lists:sum": {
      sig: "sum(List) -> number()",
      desc: "Returns the sum of elements in `List`.",
    },
    "lists:takewhile": {
      sig: "takewhile(Pred, List1) -> List2",
      desc: "Takes leading elements from `List1` while `Pred` returns `true`.",
    },
    "lists:unzip": {
      sig: "unzip(List1) -> {List2, List3}",
      desc: "Unzips a list of two-tuples into two lists.",
    },
    "lists:usort": {
      sig: "usort(List1) -> List2",
      desc: "Returns a sorted list with duplicates removed.",
    },
    "lists:zip": {
      sig: "zip(List1, List2) -> List3",
      desc: "Zips two lists of equal length into a list of two-tuples.",
    },
    "lists:zipwith": {
      sig: "zipwith(Fun, List1, List2) -> List3",
      desc: "Combines elements of two lists element-by-element using `Fun`.",
    },
    "lists:search": {
      sig: "search(Pred, List) -> {value, Value} | false",
      desc: "Returns `{value, Value}` for the first element matching `Pred`.",
    },
    "lists:uniq": {
      sig: "uniq(List1) -> List2",
      desc: "Returns `List1` with consecutive duplicates removed (OTP 25+).",
    },

    "maps:new": { sig: "new() -> #{}", desc: "Returns a new empty map." },
    "maps:get": {
      sig: "get(Key, Map) -> Value",
      desc: "Returns the value for `Key` in `Map`. Crashes if key is missing.",
    },
    "maps:put": {
      sig: "put(Key, Value, Map1) -> Map2",
      desc: "Associates `Key` with `Value` in `Map1`.",
    },
    "maps:find": {
      sig: "find(Key, Map) -> {ok, Value} | error",
      desc: "Returns `{ok, Value}` if `Key` exists, otherwise `error`.",
    },
    "maps:fold": {
      sig: "fold(Fun, Init, Map) -> Acc",
      desc: "Folds `Fun(Key, Value, AccIn)` over every key-value pair.",
    },
    "maps:from_list": {
      sig: "from_list(List) -> Map",
      desc: "Converts a list of `{Key, Value}` pairs to a map.",
    },
    "maps:is_key": {
      sig: "is_key(Key, Map) -> boolean()",
      desc: "Returns `true` if `Key` exists in `Map`.",
    },
    "maps:keys": {
      sig: "keys(Map) -> [Key]",
      desc: "Returns a list of all keys in `Map`.",
    },
    "maps:map": {
      sig: "map(Fun, Map1) -> Map2",
      desc: "Applies `Fun(Key, Value)` to every entry, updating values.",
    },
    "maps:merge": {
      sig: "merge(Map1, Map2) -> Map3",
      desc: "Merges two maps. `Map2` values take precedence on key conflicts.",
    },
    "maps:remove": {
      sig: "remove(Key, Map1) -> Map2",
      desc: "Removes `Key` and its value from `Map1`.",
    },
    "maps:size": {
      sig: "size(Map) -> non_neg_integer()",
      desc: "Returns the number of key-value pairs in `Map`.",
    },
    "maps:to_list": {
      sig: "to_list(Map) -> [{Key, Value}]",
      desc: "Converts `Map` to a list of `{Key, Value}` pairs.",
    },
    "maps:update": {
      sig: "update(Key, Value, Map1) -> Map2",
      desc: "Updates the value for an existing `Key`. Crashes if key is missing.",
    },
    "maps:values": {
      sig: "values(Map) -> [Value]",
      desc: "Returns a list of all values in `Map`.",
    },
    "maps:with": {
      sig: "with(Ks, Map1) -> Map2",
      desc: "Returns a submap containing only the keys in `Ks`.",
    },
    "maps:without": {
      sig: "without(Ks, Map1) -> Map2",
      desc: "Returns a map without the keys in `Ks`.",
    },
    "maps:filter": {
      sig: "filter(Pred, Map1) -> Map2",
      desc: "Filters key-value pairs by `Pred(Key, Value)`.",
    },
    "maps:foreach": {
      sig: "foreach(Fun, Map) -> ok",
      desc: "Calls `Fun(Key, Value)` for every entry. Returns `ok`.",
    },
    "maps:groups_from_list": {
      sig: "groups_from_list(Fun, List) -> MapOfLists",
      desc: "Groups list elements by `Fun(Elem)` into a map of lists (OTP 25+).",
    },

    "string:concat": {
      sig: "concat(Str1, Str2) -> Str3",
      desc: "Concatenates two strings.",
    },
    "string:find": {
      sig: "find(String, SearchPattern) -> string() | nomatch",
      desc: "Finds the first occurrence of `SearchPattern`.",
    },
    "string:join": {
      sig: "join(StringList, Separator) -> String",
      desc: "Joins strings with `Separator` between them.",
    },
    "string:length": {
      sig: "length(String) -> non_neg_integer()",
      desc: "Returns the number of grapheme clusters in `String`.",
    },
    "string:lexemes": {
      sig: "lexemes(String, SeparatorList) -> [Lexeme]",
      desc: "Splits `String` into lexemes by separator characters.",
    },
    "string:lowercase": {
      sig: "lowercase(String) -> string()",
      desc: "Converts `String` to lowercase.",
    },
    "string:replace": {
      sig: "replace(String, Pattern, Replacement) -> Result",
      desc: "Replaces occurrences of `Pattern` with `Replacement`.",
    },
    "string:reverse": {
      sig: "reverse(String) -> string()",
      desc: "Reverses `String`.",
    },
    "string:split": {
      sig: "split(String, Pattern) -> [SubString]",
      desc: "Splits `String` by `Pattern`.",
    },
    "string:trim": {
      sig: "trim(String) -> string()",
      desc: "Removes leading and trailing whitespace.",
    },
    "string:uppercase": {
      sig: "uppercase(String) -> string()",
      desc: "Converts `String` to uppercase.",
    },
    "string:pad": {
      sig: "pad(String, Length) -> string()",
      desc: "Pads `String` to `Length` with spaces.",
    },
    "string:prefix": {
      sig: "prefix(String, Prefix) -> Result",
      desc: "Removes `Prefix` from `String`, or returns `nomatch`.",
    },
    "string:slice": {
      sig: "slice(String, Start, Length) -> SubString",
      desc: "Returns a substring starting at `Start` of length `Length`.",
    },

    "gen_server:start_link": {
      sig: "start_link(ServerName, Module, Args, Opts) -> {ok, Pid}",
      desc: "Starts a gen_server process and links to the calling process.\n\n`ServerName` = `{local, Name}` | `{global, Name}` | `{via, Mod, Name}`",
    },
    "gen_server:call": {
      sig: "call(ServerRef, Request) -> Reply",
      desc: "Makes a synchronous call to the gen_server. Waits for a reply (default timeout: 5000ms).",
    },
    "gen_server:cast": {
      sig: "cast(ServerRef, Request) -> ok",
      desc: "Sends an asynchronous request (cast) to the gen_server. Returns immediately.",
    },
    "gen_server:reply": {
      sig: "reply(Client, Reply) -> ok",
      desc: "Sends `Reply` to `Client`. Used inside `handle_call/3` for deferred replies.",
    },
    "gen_server:stop": {
      sig: "stop(ServerRef) -> ok",
      desc: "Synchronously stops the gen_server.",
    },
    "gen_server:multi_call": {
      sig: "multi_call(Name, Request) -> {Replies, BadNodes}",
      desc: "Makes a synchronous call to gen_servers on multiple nodes.",
    },

    "supervisor:start_link": {
      sig: "start_link(Module, Args) -> {ok, Pid}",
      desc: "Starts a supervisor process. The module must implement the `supervisor` behaviour.",
    },
    "supervisor:start_child": {
      sig: "start_child(SupRef, ChildSpec) -> {ok, Pid}",
      desc: "Dynamically adds and starts a child process under the supervisor.",
    },
    "supervisor:terminate_child": {
      sig: "terminate_child(SupRef, Id) -> ok | {error, Reason}",
      desc: "Terminates the child process identified by `Id`.",
    },
    "supervisor:restart_child": {
      sig: "restart_child(SupRef, Id) -> {ok, Pid}",
      desc: "Restarts a previously terminated child process.",
    },
    "supervisor:delete_child": {
      sig: "delete_child(SupRef, Id) -> ok | {error, Reason}",
      desc: "Removes the child specification for `Id`.",
    },
    "supervisor:which_children": {
      sig: "which_children(SupRef) -> [{Id, Child, Type, Mods}]",
      desc: "Returns a list of all child processes of the supervisor.",
    },
    "supervisor:count_children": {
      sig: "count_children(SupRef) -> PropList",
      desc: "Returns counts of children: specs, active, supervisors, workers.",
    },

    "ets:new": {
      sig: "new(Name, Options) -> tid() | atom()",
      desc: "Creates a new ETS table. Options: `set`, `ordered_set`, `bag`, `duplicate_bag`, `public`, `protected`, `private`, `named_table`.",
    },
    "ets:insert": {
      sig: "insert(Tab, ObjectOrObjects) -> true",
      desc: "Inserts one or more objects (tuples) into table `Tab`.",
    },
    "ets:lookup": {
      sig: "lookup(Tab, Key) -> [Object]",
      desc: "Returns all objects with key `Key`. For `set`/`ordered_set`, returns at most one.",
    },
    "ets:delete": {
      sig: "delete(Tab) -> true",
      desc: "Deletes the entire ETS table.",
    },
    "ets:delete_object": {
      sig: "delete_object(Tab, Object) -> true",
      desc: "Deletes the exact `Object` from `Tab`.",
    },
    "ets:match": {
      sig: "match(Tab, Pattern) -> [Match]",
      desc: "Matches objects against `Pattern` using match variables `$1`, `$2`, etc.",
    },
    "ets:select": {
      sig: "select(Tab, MatchSpec) -> [Result]",
      desc: "Matches objects using a match specification. Most powerful query mechanism.",
    },
    "ets:tab2list": {
      sig: "tab2list(Tab) -> [Object]",
      desc: "Returns all objects in `Tab` as a list.",
    },
    "ets:foldl": {
      sig: "foldl(Fun, Acc0, Tab) -> Acc1",
      desc: "Folds `Fun` over all objects in `Tab` from left to right.",
    },
    "ets:info": {
      sig: "info(Tab) -> [{Item, Value}] | undefined",
      desc: "Returns information about `Tab`: size, memory, type, etc.",
    },
    "ets:member": {
      sig: "member(Tab, Key) -> boolean()",
      desc: "Returns `true` if any object with `Key` exists in `Tab`.",
    },

    "file:read_file": {
      sig: "read_file(Filename) -> {ok, Binary} | {error, Reason}",
      desc: "Reads the entire contents of `Filename` as a binary.",
    },
    "file:write_file": {
      sig: "write_file(Filename, Bytes) -> ok | {error, Reason}",
      desc: "Writes `Bytes` to `Filename`, replacing any existing content.",
    },
    "file:open": {
      sig: "open(File, Modes) -> {ok, IoDevice} | {error, Reason}",
      desc: "Opens `File`. Modes: `read`, `write`, `append`, `binary`, `raw`.",
    },
    "file:close": {
      sig: "close(IoDevice) -> ok | {error, Reason}",
      desc: "Closes the file associated with `IoDevice`.",
    },
    "file:delete": {
      sig: "delete(Filename) -> ok | {error, Reason}",
      desc: "Deletes `Filename`.",
    },
    "file:rename": {
      sig: "rename(Source, Dest) -> ok | {error, Reason}",
      desc: "Renames (moves) `Source` to `Dest`.",
    },
    "file:make_dir": {
      sig: "make_dir(Dir) -> ok | {error, Reason}",
      desc: "Creates directory `Dir`.",
    },
    "file:list_dir": {
      sig: "list_dir(Dir) -> {ok, [Filename]} | {error, Reason}",
      desc: "Lists all files and directories in `Dir`.",
    },
    "file:consult": {
      sig: "consult(Filename) -> {ok, Terms} | {error, Reason}",
      desc: "Reads Erlang terms (terminated by `.`) from `Filename`.",
    },
    "file:read_line": {
      sig: "read_line(IoDevice) -> {ok, Data} | eof",
      desc: "Reads a line from `IoDevice`.",
    },

    "timer:sleep": {
      sig: "sleep(Time) -> ok",
      desc: "Suspends the calling process for `Time` milliseconds.",
    },
    "timer:send_after": {
      sig: "send_after(Time, Msg) -> {ok, TRef}",
      desc: "Sends `Msg` to the calling process after `Time` milliseconds.",
    },
    "timer:apply_after": {
      sig: "apply_after(Time, M, F, A) -> {ok, TRef}",
      desc: "Calls `M:F(A)` after `Time` milliseconds.",
    },
    "timer:tc": {
      sig: "tc(Fun) -> {Time, Value}",
      desc: "Evaluates `Fun` and returns `{ElapsedMicroseconds, ReturnValue}`.",
    },
    "timer:send_interval": {
      sig: "send_interval(Time, Msg) -> {ok, TRef}",
      desc: "Sends `Msg` to the calling process repeatedly every `Time` ms.",
    },
    "timer:cancel": {
      sig: "cancel(TRef) -> {ok, cancel} | {error, Reason}",
      desc: "Cancels a previously created timer.",
    },

    "proplists:get_value": {
      sig: "get_value(Key, List) -> term() | undefined",
      desc: "Returns the value for `Key` in property list `List`, or `undefined`.",
    },
    "proplists:get_all_values": {
      sig: "get_all_values(Key, List) -> [term()]",
      desc: "Returns all values for `Key` in `List`.",
    },
    "proplists:is_defined": {
      sig: "is_defined(Key, List) -> boolean()",
      desc: "Returns `true` if `Key` is defined in `List`.",
    },
    "proplists:delete": {
      sig: "delete(Key, List) -> List",
      desc: "Deletes all entries for `Key`.",
    },
    "proplists:lookup": {
      sig: "lookup(Key, List) -> none | tuple()",
      desc: "Returns the first entry for `Key` as a tuple.",
    },

    "binary:split": {
      sig: "split(Subject, Pattern) -> [binary()]",
      desc: "Splits `Subject` binary by `Pattern`.",
    },
    "binary:match": {
      sig: "match(Subject, Pattern) -> {Start, Length} | nomatch",
      desc: "Finds `Pattern` in `Subject`.",
    },
    "binary:replace": {
      sig: "replace(Subject, Pattern, Replacement) -> binary()",
      desc: "Replaces `Pattern` in `Subject` with `Replacement`.",
    },
    "binary:part": {
      sig: "part(Subject, PosLen) -> binary()",
      desc: "Extracts a part of `Subject`.",
    },
    "binary:copy": {
      sig: "copy(Subject, N) -> binary()",
      desc: "Creates a binary with `N` copies of `Subject`.",
    },
  };

  // Build module -> functions mapping
  const MODULE_FUNCTIONS = {};
  for (const k in DOCS) {
    const [m, f] = k.split(":");
    if (!MODULE_FUNCTIONS[m]) MODULE_FUNCTIONS[m] = [];
    MODULE_FUNCTIONS[m].push(f);
  }

  const KEYWORD_DOCS = {
    case: {
      desc: "Pattern matching expression.\n```erlang\ncase Expr of\n    Pattern1 [when Guard1] -> Body1;\n    Pattern2 -> Body2\nend\n```",
    },
    if: {
      desc: "Guard-based conditional.\n```erlang\nif\n    Guard1 -> Body1;\n    Guard2 -> Body2;\n    true -> Default\nend\n```",
    },
    receive: {
      desc: "Waits for a message matching a pattern in the process mailbox.\n```erlang\nreceive\n    Pattern1 -> Body1\nafter\n    Timeout -> TimeoutBody\nend\n```",
    },
    fun: {
      desc: "Anonymous function.\n```erlang\nfun(X, Y) -> X + Y end\nfun module:function/Arity\n```",
    },
    try: {
      desc: "Exception handling.\n```erlang\ntry Expr of\n    Pattern -> Body\ncatch\n    Class:Reason:Stack -> Handler\nafter\n    Cleanup\nend\n```",
    },
    begin: {
      desc: "Block expression. Groups multiple expressions.\n```erlang\nbegin Expr1, Expr2, Expr3 end\n```",
    },
    when: {
      desc: "Guard separator in function heads and clauses.\n```erlang\nfoo(X) when is_integer(X), X > 0 -> positive.\n```",
    },
    after: { desc: "Timeout clause in `receive` or cleanup clause in `try`." },
    end: {
      desc: "Closes blocks: `begin`, `case`, `if`, `receive`, `fun`, `try`, `maybe`.",
    },
    of: {
      desc: "Separator between expression and patterns in `case` and `try`.",
    },
    catch: { desc: "Exception handler in `try`, or standalone `catch Expr`." },
    maybe: {
      desc: "Conditional pipeline (OTP 25+). Failed `?=` matches short-circuit.\n```erlang\nmaybe\n    {ok, A} ?= f(),\n    {ok, B} ?= g(A),\n    {ok, A + B}\nend\n```",
    },
    andalso: {
      desc: "Short-circuit boolean AND. Second operand evaluated only if first is `true`.",
    },
    orelse: {
      desc: "Short-circuit boolean OR. Second operand evaluated only if first is `false`.",
    },
    not: { desc: "Boolean NOT operator." },
    and: { desc: "Boolean AND (evaluates both sides)." },
    or: { desc: "Boolean OR (evaluates both sides)." },
    xor: { desc: "Boolean XOR operator." },
    div: { desc: "Integer division. `7 div 2 =:= 3`." },
    rem: { desc: "Integer remainder (modulo). `7 rem 2 =:= 1`." },
    band: { desc: "Bitwise AND." },
    bor: { desc: "Bitwise OR." },
    bxor: { desc: "Bitwise XOR." },
    bnot: { desc: "Bitwise NOT." },
    bsl: { desc: "Bit shift left. `1 bsl 4 =:= 16`." },
    bsr: { desc: "Bit shift right. `16 bsr 4 =:= 1`." },
  };

  const BIFS = [
    "abs",
    "apply",
    "atom_to_binary",
    "atom_to_list",
    "binary_to_list",
    "binary_to_term",
    "bit_size",
    "byte_size",
    "element",
    "erase",
    "error",
    "exit",
    "float",
    "float_to_list",
    "get",
    "hd",
    "integer_to_list",
    "iolist_to_binary",
    "is_alive",
    "is_atom",
    "is_binary",
    "is_bitstring",
    "is_boolean",
    "is_float",
    "is_function",
    "is_integer",
    "is_list",
    "is_map",
    "is_map_key",
    "is_number",
    "is_pid",
    "is_port",
    "is_process_alive",
    "is_record",
    "is_reference",
    "is_tuple",
    "length",
    "link",
    "list_to_atom",
    "list_to_binary",
    "list_to_integer",
    "list_to_tuple",
    "make_ref",
    "map_size",
    "max",
    "min",
    "monitor",
    "node",
    "now",
    "process_flag",
    "process_info",
    "put",
    "register",
    "registered",
    "round",
    "self",
    "send",
    "setelement",
    "size",
    "spawn",
    "spawn_link",
    "spawn_monitor",
    "spawn_opt",
    "split_binary",
    "term_to_binary",
    "throw",
    "tl",
    "trunc",
    "tuple_size",
    "tuple_to_list",
    "unlink",
    "unregister",
    "whereis",
  ];

  /* ===================================================================
   SNIPPETS
   =================================================================== */
  const SNIPPETS = [
    {
      label: "module",
      detail: "Module skeleton",
      insertText:
        "-module(${1:mymodule}).\n-export([${2:start/0}]).\n\n${2/\\/.*//}() ->\n    ${3:ok}.\n",
      doc: "Basic module skeleton.",
    },
    {
      label: "gen_server",
      detail: "gen_server skeleton",
      insertText:
        "-module(${1:myserver}).\n-behaviour(gen_server).\n\n-export([start_link/0]).\n-export([init/1, handle_call/3, handle_cast/2, handle_info/2,\n         terminate/2, code_change/3]).\n\n-record(state, {}).\n\nstart_link() ->\n    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).\n\ninit([]) ->\n    {ok, #state{}}.\n\nhandle_call(_Request, _From, State) ->\n    {reply, ok, State}.\n\nhandle_cast(_Msg, State) ->\n    {noreply, State}.\n\nhandle_info(_Info, State) ->\n    {noreply, State}.\n\nterminate(_Reason, _State) ->\n    ok.\n\ncode_change(_OldVsn, State, _Extra) ->\n    {ok, State}.\n",
      doc: "Complete gen_server behaviour module.",
    },
    {
      label: "gen_statem",
      detail: "gen_statem skeleton",
      insertText:
        "-module(${1:myfsm}).\n-behaviour(gen_statem).\n\n-export([start_link/0]).\n-export([init/1, callback_mode/0, handle_event/4, terminate/3]).\n\n-record(data, {}).\n\nstart_link() ->\n    gen_statem:start_link({local, ?MODULE}, ?MODULE, [], []).\n\ninit([]) ->\n    {ok, initial, #data{}}.\n\ncallback_mode() ->\n    handle_event_function.\n\nhandle_event({call, From}, _Msg, State, Data) ->\n    {next_state, State, Data, [{reply, From, ok}]};\nhandle_event(cast, _Msg, State, Data) ->\n    {next_state, State, Data};\nhandle_event(info, _Msg, State, Data) ->\n    {next_state, State, Data}.\n\nterminate(_Reason, _State, _Data) ->\n    ok.\n",
      doc: "Complete gen_statem behaviour module.",
    },
    {
      label: "supervisor",
      detail: "Supervisor skeleton",
      insertText:
        "-module(${1:mysup}).\n-behaviour(supervisor).\n\n-export([start_link/0]).\n-export([init/1]).\n\nstart_link() ->\n    supervisor:start_link({local, ?MODULE}, ?MODULE, []).\n\ninit([]) ->\n    SupFlags = #{\n        strategy => one_for_one,\n        intensity => 5,\n        period => 10\n    },\n    Children = [\n        #{\n            id => ${2:child1},\n            start => {${3:module}, start_link, []},\n            restart => permanent,\n            type => worker\n        }\n    ],\n    {ok, {SupFlags, Children}}.\n",
      doc: "Supervisor behaviour module.",
    },
    {
      label: "application",
      detail: "Application skeleton",
      insertText:
        "-module(${1:myapp}_app).\n-behaviour(application).\n\n-export([start/2, stop/1]).\n\nstart(_StartType, _StartArgs) ->\n    ${1:myapp}_sup:start_link().\n\nstop(_State) ->\n    ok.\n",
      doc: "OTP application callback module.",
    },
    {
      label: "case",
      detail: "case ... of ... end",
      insertText:
        "case ${1:Expr} of\n    ${2:Pattern1} ->\n        ${3:Body1};\n    ${4:_} ->\n        ${5:Body2}\nend",
      doc: "Case expression with pattern matching.",
    },
    {
      label: "if",
      detail: "if ... end",
      insertText:
        "if\n    ${1:Guard1} ->\n        ${2:Body1};\n    true ->\n        ${3:Default}\nend",
      doc: "If expression with guards.",
    },
    {
      label: "receive",
      detail: "receive ... after ... end",
      insertText:
        "receive\n    ${1:Pattern} ->\n        ${2:Body}\nafter\n    ${3:5000} ->\n        ${4:timeout}\nend",
      doc: "Receive with timeout.",
    },
    {
      label: "receive_no_after",
      detail: "receive ... end (no timeout)",
      insertText: "receive\n    ${1:{Msg, From}} ->\n        ${2:Body}\nend",
      doc: "Receive without timeout.",
    },
    {
      label: "try_catch",
      detail: "try ... catch ... end",
      insertText:
        "try\n    ${1:Expr}\ncatch\n    ${2:error}:${3:Reason}:${4:_Stacktrace} ->\n        ${5:Handler}\nend",
      doc: "Try-catch expression.",
    },
    {
      label: "try_of_catch",
      detail: "try ... of ... catch ... after ... end",
      insertText:
        "try ${1:Expr} of\n    ${2:Pattern} ->\n        ${3:OkBody}\ncatch\n    ${4:error}:${5:Reason} ->\n        ${6:ErrBody}\nafter\n    ${7:Cleanup}\nend",
      doc: "Full try-of-catch-after expression.",
    },
    {
      label: "fun_anon",
      detail: "fun(...) -> ... end",
      insertText: "fun(${1:X}) -> ${2:X} end",
      doc: "Anonymous function.",
    },
    {
      label: "fun_multi",
      detail: "fun with multiple clauses",
      insertText:
        "fun\n    (${1:Pattern1}) -> ${2:Body1};\n    (${3:Pattern2}) -> ${4:Body2}\nend",
      doc: "Anonymous function with multiple clauses.",
    },
    {
      label: "lc",
      detail: "List comprehension",
      insertText: "[${1:Expr} || ${2:X} <- ${3:List}${4:, ${5:Guard}}]",
      doc: "List comprehension.",
    },
    {
      label: "bc",
      detail: "Binary comprehension",
      insertText: "<< <<${1:Expr}>> || <<${2:X}>> <= ${3:Binary} >>",
      doc: "Binary comprehension.",
    },
    {
      label: "mc",
      detail: "Map comprehension (OTP 26+)",
      insertText: "#{${1:K} => ${2:V} || ${3:K} := ${4:V} <- ${5:Map}}",
      doc: "Map comprehension.",
    },
    {
      label: "record",
      detail: "-record definition",
      insertText:
        "-record(${1:name}, {\n    ${2:field1} = ${3:undefined} :: ${4:term()},\n    ${5:field2} = ${6:undefined} :: ${7:term()}\n}).",
      doc: "Record type definition.",
    },
    {
      label: "spec",
      detail: "-spec",
      insertText: "-spec ${1:function}(${2:ArgType}) -> ${3:RetType}.",
      doc: "Function type specification.",
    },
    {
      label: "type",
      detail: "-type",
      insertText: "-type ${1:name}() :: ${2:Definition}.",
      doc: "Type alias definition.",
    },
    {
      label: "opaque",
      detail: "-opaque",
      insertText: "-opaque ${1:name}() :: ${2:Definition}.",
      doc: "Opaque type definition.",
    },
    {
      label: "callback",
      detail: "-callback",
      insertText: "-callback ${1:function}(${2:ArgType}) -> ${3:RetType}.",
      doc: "Behaviour callback specification.",
    },
    {
      label: "define",
      detail: "-define macro",
      insertText: "-define(${1:NAME}, ${2:Value}).",
      doc: "Preprocessor macro definition.",
    },
    {
      label: "define_func",
      detail: "-define function macro",
      insertText: "-define(${1:NAME}(${2:Args}), ${3:Body}).",
      doc: "Function-like macro definition.",
    },
    {
      label: "ifdef",
      detail: "-ifdef ... -endif",
      insertText: "-ifdef(${1:MACRO}).\n${2}\n-endif.",
      doc: "Conditional compilation (ifdef).",
    },
    {
      label: "ifndef",
      detail: "-ifndef ... -endif",
      insertText: "-ifndef(${1:MACRO}).\n${2}\n-endif.",
      doc: "Conditional compilation (ifndef).",
    },
    {
      label: "export",
      detail: "-export",
      insertText: "-export([${1:fun_name/arity}]).",
      doc: "Export attribute.",
    },
    {
      label: "eunit_test",
      detail: "EUnit test",
      insertText:
        "${1:name}_test() ->\n    ?assertEqual(${2:Expected}, ${3:Actual}).",
      doc: "EUnit test function.",
    },
    {
      label: "eunit_gen",
      detail: "EUnit test generator",
      insertText:
        "${1:name}_test_() ->\n    [\n        ?_assertEqual(${2:Expected}, ${3:Actual})\n    ].",
      doc: "EUnit test generator.",
    },
    {
      label: "ct_suite",
      detail: "Common Test suite skeleton",
      insertText:
        '-module(${1:my}_SUITE).\n-include_lib("common_test/include/ct.hrl").\n\n-export([all/0, init_per_suite/1, end_per_suite/1]).\n-export([${2:my_test}/1]).\n\nall() -> [${2:my_test}].\n\ninit_per_suite(Config) -> Config.\nend_per_suite(_Config) -> ok.\n\n${2:my_test}(_Config) ->\n    ${3:ok}.\n',
      doc: "Common Test suite module.",
    },
    {
      label: "spawn_proc",
      detail: "Spawn a process",
      insertText: "spawn(fun() ->\n    ${1:Body}\nend)",
      doc: "Spawn a new process.",
    },
    {
      label: "spawn_link_proc",
      detail: "Spawn linked process",
      insertText: "spawn_link(fun() ->\n    ${1:Body}\nend)",
      doc: "Spawn a linked process.",
    },
    {
      label: "spawn_monitor_proc",
      detail: "Spawn monitored process",
      insertText: "{Pid, MonRef} = spawn_monitor(fun() ->\n    ${1:Body}\nend)",
      doc: "Spawn a monitored process.",
    },
    {
      label: "maybe_block",
      detail: "maybe ... end (OTP 25+)",
      insertText:
        "maybe\n    ${1:{ok, A}} ?= ${2:f()},\n    ${3:{ok, B}} ?= ${4:g(A)},\n    ${5:{ok, A + B}}\nend",
      doc: "Maybe expression with conditional matching.",
    },
  ];

  /* ===================================================================
   REGISTER LANGUAGE
   =================================================================== */
  monaco.languages.register({
    id: "erlang",
    extensions: [".erl", ".hrl", ".app.src", ".config", ".escript"],
    aliases: ["Erlang", "erlang"],
    mimetypes: ["text/x-erlang"],
  });

  /* ===================================================================
   LANGUAGE CONFIGURATION
   =================================================================== */
  monaco.languages.setLanguageConfiguration("erlang", {
    comments: { lineComment: "%" },
    brackets: [
      ["{", "}"],
      ["\[", "]"],
      ["(", ")"],
      ["<<", ">>"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "<<", close: ">>" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: { start: /^\s*%%\s*#?region\b/, end: /^\s*%%\s*#?endregion\b/ },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    indentationRules: {
      increaseIndentPattern:
        /^\s*(after|begin|case|catch|fun|if|of|receive|try|when|maybe)\b.*(->\s*)?$/,
      decreaseIndentPattern: /^\s*(end|after)[;.,\s]*$/,
    },
    onEnterRules: [
      {
        beforeText: /->[\s]*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  /* ===================================================================
   MONARCH TOKENIZER
   =================================================================== */
  monaco.languages.setMonarchTokensProvider("erlang", {
    defaultToken: "source",
    keywords: [
      "after",
      "begin",
      "case",
      "catch",
      "cond",
      "end",
      "fun",
      "if",
      "let",
      "of",
      "receive",
      "try",
      "when",
      "maybe",
      "else",
    ],
    operatorKeywords: [
      "and",
      "andalso",
      "band",
      "bnot",
      "bor",
      "bsl",
      "bsr",
      "bxor",
      "div",
      "not",
      "or",
      "orelse",
      "rem",
      "xor",
    ],
    guards: [
      "is_atom",
      "is_binary",
      "is_bitstring",
      "is_boolean",
      "is_float",
      "is_function",
      "is_integer",
      "is_list",
      "is_map",
      "is_map_key",
      "is_number",
      "is_pid",
      "is_port",
      "is_record",
      "is_reference",
      "is_tuple",
      "abs",
      "bit_size",
      "byte_size",
      "element",
      "float",
      "hd",
      "length",
      "map_size",
      "max",
      "min",
      "node",
      "round",
      "self",
      "size",
      "tl",
      "trunc",
      "tuple_size",
    ],
    atoms: [
      "true",
      "false",
      "undefined",
      "ok",
      "error",
      "nil",
      "infinity",
      "noreply",
      "reply",
      "stop",
      "normal",
      "shutdown",
      "ignore",
    ],
    escapes: /\\(?:[abdefnrstv\\"']|x[0-9A-Fa-f]{1,2}|\^[@-_]|\d{1,3})/,

    tokenizer: {
      root: [
        { include: "@whitespace" },

        [
          /(-)(module|export|export_type|import|compile|define|undef|ifdef|ifndef|else|endif|include|include_lib|record|spec|callback|type|opaque|behaviour|behavior|on_load|vsn|author|file|deprecated|feature|doc|moduledoc)\b/,
          ["keyword.directive", "keyword.directive"],
        ],

        [/\$\\./, "number.char"],
        [/\$./, "number.char"],

        [/'/, "string.atom", "@quotedAtom"],
        [/"/, "string", "@string"],

        [/\d+#[0-9a-fA-F_]+/, "number"],
        [/\d+\.\d+([eE][+-]?\d+)?/, "number.float"],
        [/\d[\d_]*/, "number"],

        [/[A-Z_][a-zA-Z0-9_]*/, "variable"],
        [/\?[a-zA-Z_]\w*/, "constant"],
        [/#[a-z]\w*/, "type"],

        [
          /[a-z][a-zA-Z0-9_]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@operatorKeywords": "keyword.operator",
              "@guards": "support.function",
              "@atoms": "constant.language",
              "@default": "tag",
            },
          },
        ],

        [/=>|:=|\?=/, "keyword.operator"],
        [/->|<-/, "keyword.operator"],
        [/=:=|=\/=/, "keyword.operator"],
        [/=<|>=|==|\/=/, "keyword.operator"],
        [/\+\+|--/, "keyword.operator"],
        [/<</, "keyword.operator"],
        [/>>/, "keyword.operator"],
        [/[+\-*\/]/, "keyword.operator"],
        [/[=!<>|]/, "keyword.operator"],
        [/[;.,:#]/, "delimiter"],
        [/[{}()\[\]]/, "@brackets"],
      ],

      whitespace: [
        [/\s+/, "white"],
        [/%%%.*$/, "comment.doc"],
        [/%%.*$/, "comment.doc"],
        [/%.*$/, "comment"],
      ],

      string: [
        [/[^\\"~]+/, "string"],
        [/@escapes/, "string.escape"],
        [/~[~nitsweofgpcPWBX#.*+\-0-9]/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      quotedAtom: [
        [/[^\\']+/, "string.atom"],
        [/@escapes/, "string.atom"],
        [/\\./, "string.atom"],
        [/'/, "string.atom", "@pop"],
      ],
    },
  });

  /* ===================================================================
   COMPLETION PROVIDER
   =================================================================== */
  monaco.languages.registerCompletionItemProvider("erlang", {
    triggerCharacters: [":", "-", "?", "#"],
    provideCompletionItems: function (model, position) {
      var line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      var suggestions = [];
      var CK = monaco.languages.CompletionItemKind;
      var SNP = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      var wi = model.getWordUntilPosition(position);
      var wr = {
        startLineNumber: position.lineNumber,
        startColumn: wi.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      };

      // Module:function completions
      var mm = line.match(/([a-z]\w*):([a-z]?\w*)$/);
      if (mm) {
        var mod = mm[1],
          pre = mm[2];
        var r2 = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - pre.length,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        var fns = MODULE_FUNCTIONS[mod];
        if (fns)
          fns.forEach(function (fn) {
            var d = DOCS[mod + ":" + fn];
            suggestions.push({
              label: fn,
              kind: CK.Function,
              detail: d ? d.sig : mod + ":" + fn,
              documentation: d ? { value: d.desc } : undefined,
              insertText: fn,
              range: r2,
              sortText: "0" + fn,
            });
          });
        return { suggestions: suggestions };
      }

      // Attribute completions after -
      var am = line.match(/^\s*-([a-z]*)$/);
      if (am) {
        var ap = am[1];
        var ar = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - ap.length,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        [
          { l: "module", t: "module(${1:Name}).", d: "Module declaration" },
          {
            l: "export",
            t: "export([${1:fun/arity}]).",
            d: "Export functions",
          },
          {
            l: "export_type",
            t: "export_type([${1:type/arity}]).",
            d: "Export types",
          },
          {
            l: "import",
            t: "import(${1:Module}, [${2:fun/arity}]).",
            d: "Import functions",
          },
          {
            l: "behaviour",
            t: "behaviour(${1:Behaviour}).",
            d: "Declare behaviour",
          },
          {
            l: "behavior",
            t: "behavior(${1:Behavior}).",
            d: "Declare behavior",
          },
          {
            l: "record",
            t: "record(${1:name}, {\n    ${2:field1} :: ${3:term()}\n}).",
            d: "Define record",
          },
          {
            l: "define",
            t: "define(${1:NAME}, ${2:Value}).",
            d: "Define macro",
          },
          { l: "include", t: 'include("${1:file.hrl}").', d: "Include header" },
          {
            l: "include_lib",
            t: 'include_lib("${1:app/include/file.hrl}").',
            d: "Include lib header",
          },
          {
            l: "spec",
            t: "spec ${1:function}(${2:ArgTypes}) -> ${3:RetType}.",
            d: "Type spec",
          },
          {
            l: "type",
            t: "type ${1:name}() :: ${2:Def}.",
            d: "Type definition",
          },
          {
            l: "opaque",
            t: "opaque ${1:name}() :: ${2:Def}.",
            d: "Opaque type",
          },
          {
            l: "callback",
            t: "callback ${1:function}(${2:ArgTypes}) -> ${3:RetType}.",
            d: "Callback spec",
          },
          { l: "compile", t: "compile(${1:Options}).", d: "Compiler options" },
          { l: "ifdef", t: "ifdef(${1:MACRO}).", d: "Conditional: ifdef" },
          { l: "ifndef", t: "ifndef(${1:MACRO}).", d: "Conditional: ifndef" },
          { l: "endif", t: "endif.", d: "End conditional" },
          { l: "undef", t: "undef(${1:MACRO}).", d: "Undefine macro" },
          {
            l: "on_load",
            t: "on_load(${1:function/0}).",
            d: "On-load function",
          },
        ].forEach(function (a) {
          suggestions.push({
            label: a.l,
            kind: CK.Property,
            detail: "-" + a.l,
            documentation: a.d,
            insertText: a.t,
            insertTextRules: SNP,
            range: ar,
            sortText: "0" + a.l,
          });
        });
        return { suggestions: suggestions };
      }

      // Snippets
      SNIPPETS.forEach(function (s) {
        suggestions.push({
          label: s.label,
          kind: CK.Snippet,
          detail: "Snippet: " + s.detail,
          documentation: { value: s.doc },
          insertText: s.insertText,
          insertTextRules: SNP,
          range: wr,
          sortText: "1" + s.label,
        });
      });

      // Keywords & common atoms
      [
        "after",
        "begin",
        "case",
        "catch",
        "cond",
        "end",
        "fun",
        "if",
        "let",
        "of",
        "receive",
        "try",
        "when",
        "maybe",
        "else",
        "and",
        "andalso",
        "band",
        "bnot",
        "bor",
        "bsl",
        "bsr",
        "bxor",
        "div",
        "not",
        "or",
        "orelse",
        "rem",
        "xor",
        "true",
        "false",
        "undefined",
        "ok",
        "error",
      ].forEach(function (kw) {
        suggestions.push({
          label: kw,
          kind: CK.Keyword,
          detail: "keyword",
          insertText: kw,
          range: wr,
          sortText: "2" + kw,
        });
      });

      // BIFs
      BIFS.forEach(function (fn) {
        var d = DOCS["erlang:" + fn];
        suggestions.push({
          label: fn,
          kind: CK.Function,
          detail: d ? d.sig : "BIF",
          documentation: d
            ? {
                value: d.desc + "\n\n*Auto-imported BIF from `erlang` module.*",
              }
            : undefined,
          insertText: fn,
          range: wr,
          sortText: "3" + fn,
        });
      });

      // Module names
      Object.keys(MODULE_FUNCTIONS).forEach(function (mod) {
        suggestions.push({
          label: mod,
          kind: CK.Module,
          detail: "module (" + MODULE_FUNCTIONS[mod].length + " functions)",
          insertText: mod,
          range: wr,
          sortText: "4" + mod,
        });
      });

      // User-defined functions and variables from document
      var text = model.getValue();
      var fp = /^([a-z]\w*)\s*\(/gm,
        seen = {},
        m;
      while ((m = fp.exec(text)) !== null) {
        if (!seen[m[1]]) {
          seen[m[1]] = true;
          suggestions.push({
            label: m[1],
            kind: CK.Function,
            detail: "local function",
            insertText: m[1],
            range: wr,
            sortText: "0a" + m[1],
          });
        }
      }
      var vp = /\b([A-Z][a-zA-Z0-9_]*)\b/g,
        sv = {};
      while ((m = vp.exec(text)) !== null) {
        if (!sv[m[1]]) {
          sv[m[1]] = true;
          suggestions.push({
            label: m[1],
            kind: CK.Variable,
            detail: "variable",
            insertText: m[1],
            range: wr,
            sortText: "0b" + m[1],
          });
        }
      }
      // Macros from document
      var mp = /-define\(\s*([A-Z_]\w*)/g,
        sm = {};
      while ((m = mp.exec(text)) !== null) {
        if (!sm[m[1]]) {
          sm[m[1]] = true;
          suggestions.push({
            label: "?" + m[1],
            kind: CK.Constant,
            detail: "macro",
            insertText: "?" + m[1],
            range: wr,
            sortText: "0c" + m[1],
          });
        }
      }
      // Records from document
      var rp = /-record\(\s*([a-z]\w*)/g,
        sr = {};
      while ((m = rp.exec(text)) !== null) {
        if (!sr[m[1]]) {
          sr[m[1]] = true;
          suggestions.push({
            label: "#" + m[1],
            kind: CK.Struct,
            detail: "record",
            insertText: "#" + m[1],
            range: wr,
            sortText: "0d" + m[1],
          });
        }
      }

      return { suggestions: suggestions };
    },
  });

  /* ===================================================================
   HOVER PROVIDER
   =================================================================== */
  monaco.languages.registerHoverProvider("erlang", {
    provideHover: function (model, position) {
      var line = model.getLineContent(position.lineNumber);
      var wi = model.getWordAtPosition(position);
      if (!wi) return null;
      var word = wi.word;
      var range = {
        startLineNumber: position.lineNumber,
        startColumn: wi.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: wi.endColumn,
      };
      var before = line.substring(0, wi.startColumn - 1);
      var after = line.substring(wi.endColumn - 1);

      // module:function — cursor on function
      var mm = before.match(/([a-z]\w*):\s*$/);
      if (mm) {
        var d = DOCS[mm[1] + ":" + word];
        if (d)
          return {
            range: range,
            contents: [
              { value: "```erlang\n" + mm[1] + ":" + d.sig + "\n```" },
              { value: d.desc },
            ],
          };
      }

      // module:function — cursor on module
      if (after.match(/^:/)) {
        var fns = MODULE_FUNCTIONS[word];
        if (fns)
          return {
            range: range,
            contents: [
              {
                value:
                  "**Module `" +
                  word +
                  "`** — " +
                  fns.length +
                  " known functions",
              },
              {
                value:
                  "`" +
                  fns.slice(0, 20).join("`, `") +
                  "`" +
                  (fns.length > 20 ? ", ..." : ""),
              },
            ],
          };
      }

      // BIF
      if (BIFS.indexOf(word) !== -1) {
        var bd = DOCS["erlang:" + word];
        if (bd)
          return {
            range: range,
            contents: [
              { value: "```erlang\nerlang:" + bd.sig + "\n```" },
              { value: bd.desc + "\n\n*Auto-imported BIF*" },
            ],
          };
      }

      // Keyword
      if (KEYWORD_DOCS[word])
        return {
          range: range,
          contents: [
            { value: "**keyword `" + word + "`**" },
            { value: KEYWORD_DOCS[word].desc },
          ],
        };

      // Variable
      if (word.match(/^[A-Z_]/)) {
        var vr = new RegExp(
            "\\b" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
            "g",
          ),
          c = 0,
          t = model.getValue();
        while (vr.exec(t) !== null) c++;
        var extra =
          word === "_"
            ? " Anonymous variable — matches anything and is never bound."
            : "";
        return {
          range: range,
          contents: [
            { value: "**Variable `" + word + "`**" },
            { value: c + " occurrence(s) in this file." + extra },
          ],
        };
      }

      // Macro ?NAME
      if (before.match(/\?\s*$/)) {
        var lines = model.getValue().split("\n");
        for (var i = 0; i < lines.length; i++) {
          var dm = lines[i].match(
            new RegExp(
              "-define\\(\\s*" +
                word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
                "\\b(.*)",
            ),
          );
          if (dm)
            return {
              range: range,
              contents: [
                { value: "**Macro `?" + word + "`**" },
                { value: "```erlang\n" + lines[i].trim() + "\n```" },
                { value: "*Defined at line " + (i + 1) + "*" },
              ],
            };
        }
      }

      // User-defined function: look for definition + doc comment + spec
      var lines2 = model.getValue().split("\n");
      var funcPat = new RegExp(
        "^" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\(",
      );
      for (var i2 = 0; i2 < lines2.length; i2++) {
        if (funcPat.test(lines2[i2])) {
          var docC = "",
            j = i2 - 1;
          while (j >= 0 && lines2[j].match(/^\s*%%?/)) {
            docC = lines2[j].replace(/^\s*%%?\s?/, "") + "\n" + docC;
            j--;
          }
          var specL = "";
          for (var k = Math.max(0, i2 - 6); k < i2; k++) {
            if (lines2[k].match(new RegExp("-spec\\s+" + word))) {
              specL = lines2[k].trim();
              break;
            }
          }
          var contents = [
            { value: "```erlang\n" + (specL || lines2[i2].trim()) + "\n```" },
          ];
          if (docC.trim()) contents.push({ value: docC.trim() });
          contents.push({ value: "*Defined at line " + (i2 + 1) + "*" });
          return { range: range, contents: contents };
        }
      }

      return null;
    },
  });

  /* ===================================================================
   DEFINITION PROVIDER
   =================================================================== */
  // ─── Binding resolution (shared by the definition and rename providers) ───
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding (atoms, functions) report `local: false` so callers can
  // keep their document-wide behaviour.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const name = word.word;

    const lines = model.getLinesContent();
    const lineStart: number[] = [];
    let size = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(size);
      size += lines[i].length + 1;
    }
    const at = (line: number, col: number) => lineStart[line] + col;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // An Erlang form ends with a period at bracket depth 0; variables are
    // scoped to the form (each clause introduces fresh variables).
    type Scope = { start: number; end: number; names: Set<string> };
    const scopes: Scope[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (ch === "%") break;
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (
          depth === 0 &&
          ch === "." &&
          (c + 1 >= line.length || /\s/.test(line[c + 1]))
        ) {
          scopes.push({ start, end: at(i, c), names: new Set<string>() });
          start = at(i, c + 1);
        }
      }
    }
    scopes.push({
      start,
      end: at(lines.length - 1, lines[lines.length - 1].length),
      names: new Set<string>(),
    });

    // Innermost scope containing `offset` (geometry only).
    const enclosing = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start <= offset && offset <= scope.end) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };
    // Innermost enclosing scope that declares `name` — the name's binding.
    const declaring = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (
          scope.start <= offset &&
          offset <= scope.end &&
          scope.names.has(name)
        ) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };

    // A variable (uppercase or `_`) is bound at its first occurrence in the
    // form; atoms and function names are global, so they are left alone.
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
    if (/^[A-Z_]/.test(name)) {
      const seen = new Set<Scope>();
      for (let i = 0; i < lines.length; i++) {
        occurrence.lastIndex = 0;
        let m;
        while ((m = occurrence.exec(lines[i])) !== null) {
          const pos = at(i, m.index);
          const scope = enclosing(pos);
          if (!scope || seen.has(scope)) continue;
          seen.add(scope);
          scope.names.add(name);
          declarations.push({ start: pos, end: pos + name.length, scope });
        }
      }
    }

    // Resolve a name span to its binding: declarations use their own scope,
    // plain references the innermost enclosing declaration of the name.
    const resolve = (start: number, end: number) => {
      for (const decl of declarations) {
        if (decl.start <= start && end <= decl.end) return decl.scope;
      }
      return declaring(start);
    };

    const cursorLine = position.lineNumber - 1;
    const cursor = resolve(
      at(cursorLine, word.startColumn - 1),
      at(cursorLine, word.endColumn - 1),
    );
    const targetStart = cursor ? cursor.start : -1;
    const decl =
      targetStart === -1
        ? undefined
        : declarations.find((d) => d.scope && d.scope.start === targetStart);

    // Every occurrence bound to the same binding, and the one declaring it.
    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    for (let i = 0; i < lines.length; i++) {
      occurrence.lastIndex = 0;
      let m;
      while ((m = occurrence.exec(lines[i])) !== null) {
        const pos = at(i, m.index);
        const scope = resolve(pos, pos + name.length);
        if ((scope ? scope.start : -1) !== targetStart) continue;
        const range: Occurrence = {
          line: i + 1,
          startColumn: m.index + 1,
          endColumn: m.index + 1 + name.length,
        };
        occurrences.push(range);
        if (decl && decl.start <= pos && pos + name.length <= decl.end)
          declarationRange = range;
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  };

  monaco.languages.registerDefinitionProvider("erlang", {
    provideDefinition: function (model, position) {
      // A form-local variable resolves to its own binding, not the first match.
      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        if (!binding.declaration) return null;
        const d = binding.declaration;
        return {
          uri: model.uri,
          range: new monaco.Range(d.line, d.startColumn, d.line, d.endColumn),
        };
      }
      var wi = model.getWordAtPosition(position);
      if (!wi) return null;
      var word = wi.word;
      var lines = model.getValue().split("\n");
      var line = model.getLineContent(position.lineNumber);
      var before = line.substring(0, wi.startColumn - 1);

      // Function definition
      var fp = new RegExp(
        "^" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\(",
      );
      for (var i = 0; i < lines.length; i++) {
        if (fp.test(lines[i]))
          return {
            uri: model.uri,
            range: {
              startLineNumber: i + 1,
              startColumn: 1,
              endLineNumber: i + 1,
              endColumn: word.length + 1,
            },
          };
      }

      // Record definition (#record or after #)
      if (before.match(/#\s*$/) || line.match(new RegExp("#" + word))) {
        var rp = new RegExp("-record\\s*\\(\\s*" + word);
        for (var i2 = 0; i2 < lines.length; i2++) {
          if (rp.test(lines[i2]))
            return {
              uri: model.uri,
              range: {
                startLineNumber: i2 + 1,
                startColumn: 1,
                endLineNumber: i2 + 1,
                endColumn: lines[i2].length + 1,
              },
            };
        }
      }

      // Macro definition (?MACRO)
      if (before.match(/\?\s*$/)) {
        var mp = new RegExp("-define\\s*\\(\\s*" + word);
        for (var i3 = 0; i3 < lines.length; i3++) {
          if (mp.test(lines[i3]))
            return {
              uri: model.uri,
              range: {
                startLineNumber: i3 + 1,
                startColumn: 1,
                endLineNumber: i3 + 1,
                endColumn: lines[i3].length + 1,
              },
            };
        }
      }

      // Type definition
      var tp = new RegExp("-(?:type|opaque)\\s+" + word + "\\s*\\(");
      for (var i4 = 0; i4 < lines.length; i4++) {
        if (tp.test(lines[i4]))
          return {
            uri: model.uri,
            range: {
              startLineNumber: i4 + 1,
              startColumn: 1,
              endLineNumber: i4 + 1,
              endColumn: lines[i4].length + 1,
            },
          };
      }

      return null;
    },
  });

  /* ===================================================================
   SIGNATURE HELP PROVIDER
   =================================================================== */
  monaco.languages.registerSignatureHelpProvider("erlang", {
    signatureHelpTriggerCharacters: ["(", ","],
    signatureHelpRetriggerCharacters: [","],
    provideSignatureHelp: function (model, position) {
      var line = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      var cm = line.match(/([a-z]\w*):([a-z]\w*)\s*\(([^)]*)$/);
      var bm = !cm && line.match(/\b([a-z]\w*)\s*\(([^)]*)$/);
      var key, fn, args;

      if (cm) {
        key = cm[1] + ":" + cm[2];
        fn = cm[1] + ":" + cm[2];
        args = cm[3];
      } else if (bm) {
        key = "erlang:" + bm[1];
        fn = bm[1];
        args = bm[2];
      }
      if (!key || !DOCS[key]) return null;

      var doc = DOCS[key];
      var activeParam = 0,
        depth = 0;
      if (args)
        for (var i = 0; i < args.length; i++) {
          var c = args[i];
          if ("([{<".indexOf(c) >= 0) depth++;
          else if (")]}>".indexOf(c) >= 0) depth--;
          else if (c === "," && depth === 0) activeParam++;
        }

      var sigLines = doc.sig.split("\n");
      var sigs = sigLines.map(function (sl) {
        var pm = sl.match(/\(([^)]*)\)/);
        var params = [];
        if (pm)
          pm[1].split(",").forEach(function (p) {
            params.push({ label: p.trim(), documentation: "" });
          });
        return {
          label: fn + sl.substring(sl.indexOf("(")),
          documentation: doc.desc,
          parameters: params,
        };
      });

      return {
        value: {
          signatures: sigs,
          activeSignature: 0,
          activeParameter: activeParam,
        },
        dispose: function () {},
      };
    },
  });

  /* ===================================================================
   DOCUMENT SYMBOL PROVIDER (Outline)
   =================================================================== */
  monaco.languages.registerDocumentSymbolProvider("erlang", {
    provideDocumentSymbols: function (model) {
      var symbols = [],
        lines = model.getValue().split("\n"),
        SK = monaco.languages.SymbolKind,
        seen = {};
      for (var i = 0; i < lines.length; i++) {
        var L = lines[i];
        var mr = function (
          startLineNumber,
          startColumn,
          endLineNumber,
          endColumn,
        ) {
          return {
            startLineNumber: startLineNumber,
            startColumn: startColumn,
            endLineNumber: endLineNumber,
            endColumn: endColumn,
          };
        };
        var lr = mr(i + 1, 1, i + 1, L.length + 1);

        var mm = L.match(/^-module\(([a-z]\w*)\)/);
        if (mm) {
          symbols.push({
            name: mm[1],
            kind: SK.Module,
            range: lr,
            selectionRange: lr,
            detail: "module",
          });
          continue;
        }
        var rm = L.match(/^-record\(\s*([a-z]\w*)/);
        if (rm) {
          symbols.push({
            name: "#" + rm[1],
            kind: SK.Struct,
            range: lr,
            selectionRange: lr,
            detail: "record",
          });
          continue;
        }
        var tm = L.match(/^-(?:type|opaque)\s+([a-z]\w*)/);
        if (tm) {
          symbols.push({
            name: tm[1] + "()",
            kind: SK.TypeParameter,
            range: lr,
            selectionRange: lr,
            detail: "type",
          });
          continue;
        }
        var dm = L.match(/^-define\(\s*([A-Z_]\w*)/);
        if (dm) {
          symbols.push({
            name: "?" + dm[1],
            kind: SK.Constant,
            range: lr,
            selectionRange: lr,
            detail: "macro",
          });
          continue;
        }
        var cb = L.match(/^-callback\s+(\w+)/);
        if (cb) {
          symbols.push({
            name: cb[1],
            kind: SK.Interface,
            range: lr,
            selectionRange: lr,
            detail: "callback",
          });
          continue;
        }
        var fm = L.match(/^([a-z]\w*)\s*\(/);
        if (fm && !seen[fm[1]]) {
          seen[fm[1]] = true;
          symbols.push({
            name: fm[1],
            kind: SK.Function,
            range: lr,
            selectionRange: mr(i + 1, 1, i + 1, fm[1].length + 1),
            detail: "function",
          });
        }
      }
      return symbols;
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("erlang", {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
      return {
        edits: binding.occurrences.map((r) => ({
          resource: model.uri,
          versionId: model.getVersionId(),
          textEdit: {
            range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
            text: newName,
          },
        })),
      };
    },
    resolveRenameLocation: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        text: word.word,
      };
    },
  });
};
