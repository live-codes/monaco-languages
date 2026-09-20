/**
 * Languages shown in the demo (index.html) and the sample code loaded for each.
 *
 * To add a language:
 *   1. add an entry to `languages`
 *   2. add a sample to `samples` under the same key (the language id)
 *
 * Language entry:
 *   id     - the language id registered by the support module in ./dist
 *   name   - label shown in the dropdown
 *   module - the module file in ./dist. Only needed when it differs from `id`;
 *            by default ./dist/<id>.js is loaded. The Visual Basic support is
 *            the exception: it lives in ./dist/vb.js but registers the
 *            language id "vbnet".
 */

export const languages = [
  { id: "astro", name: "Astro" },
  { id: "c", name: "C" },
  { id: "clio", name: "Clio" },
  { id: "cobol", name: "COBOL" },
  { id: "commonlisp", name: "Common Lisp" },
  { id: "cpp", name: "C++" },
  { id: "csharp", name: "C#" },
  { id: "dart", name: "Dart" },
  { id: "elixir", name: "Elixir" },
  { id: "elm", name: "Elm" },
  { id: "erlang", name: "Erlang" },
  { id: "fsharp", name: "F#" },
  { id: "go", name: "Go" },
  { id: "haskell", name: "Haskell" },
  { id: "haxe", name: "Haxe" },
  { id: "imba", name: "Imba" },
  { id: "java", name: "Java" },
  { id: "json5", name: "JSON5" },
  { id: "julia", name: "Julia" },
  { id: "kotlin", name: "Kotlin" },
  { id: "lean", name: "Lean 4" },
  { id: "lua", name: "Lua" },
  { id: "minizinc", name: "MiniZinc" },
  { id: "nim", name: "Nim" },
  { id: "objc", name: "Objective-C" },
  { id: "objcpp", name: "Objective-C++" },
  { id: "pascal", name: "Pascal" },
  { id: "php", name: "PHP" },
  { id: "prolog", name: "Prolog" },
  { id: "purescript", name: "PureScript" },
  { id: "python", name: "Python" },
  { id: "r", name: "R" },
  { id: "ripple", name: "Ripple" },
  { id: "ruby", name: "Ruby" },
  { id: "rune", name: "Rune" },
  { id: "rust", name: "Rust" },
  { id: "scala", name: "Scala" },
  { id: "scheme", name: "Scheme" },
  { id: "sql", name: "SQL" },
  { id: "svelte", name: "Svelte" },
  { id: "swift", name: "Swift" },
  { id: "vbnet", name: "Visual Basic", module: "vb" },
  { id: "vue", name: "Vue" },
  { id: "wat", name: "WebAssembly (WAT)" },
  { id: "zig", name: "Zig" },
];

/** Sample source loaded for a language, keyed by language id. */
export const samples = {
  astro: `---
const title = "Astro";
const items = ["Islands", "Zero JS", "Content-first"];
---

<html lang="en">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>Hello, {title}!</h1>
    <ul>
      {items.map((item) => <li>{item}</li>)}
    </ul>
  </body>
</html>
`,

  c: `#include <stdio.h>

int factorial(int n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

int main(void) {
  for (int i = 0; i < 6; i++) {
    printf("%d! = %d\\n", i, factorial(i));
  }
  return 0;
}
`,

  clio: `import { log } from "clio"

fn add(a: Number, b: Number) -> a + b

fn factorial(n: Number) ->
  if (n <= 1)
    1
  else
    n * factorial(n - 1)

export fn main() ->
  log(add(factorial(5), 1))
`,

  cobol: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-COUNT    PIC 9(2) VALUE 1.
       01 WS-MESSAGE  PIC X(30) VALUE "HELLO, COBOL!".

       PROCEDURE DIVISION.
       MAIN-PARA.
           PERFORM VARYING WS-COUNT FROM 1 BY 1
               UNTIL WS-COUNT > 3
               DISPLAY WS-MESSAGE " " WS-COUNT
           END-PERFORM
           STOP RUN.
`,

  commonlisp: `(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (1- n)))))

(defun greet (name)
  (format t "Hello, ~a!~%" name))

(dolist (n '(0 1 5 10))
  (format t "~d! = ~d~%" n (factorial n)))

(greet "Common Lisp")
`,

  cpp: `#include <iostream>
#include <vector>

template <typename T>
T sum(const std::vector<T>& values) {
  T total{};
  for (const auto& value : values) {
    total += value;
  }
  return total;
}

int main() {
  std::vector<int> numbers{1, 2, 3, 4, 5};
  std::cout << "Sum: " << sum(numbers) << '\\n';
  return 0;
}
`,

  csharp: `using System;
using System.Linq;

record Person(string Name, int Age);

class Program
{
    static void Main()
    {
        var people = new[]
        {
            new Person("Ada", 36),
            new Person("Alan", 41),
            new Person("Grace", 45),
        };

        foreach (var person in people.Where(p => p.Age > 38))
        {
            Console.WriteLine($"{person.Name} is {person.Age}");
        }
    }
}
`,

  dart: `import 'dart:async';

class Counter {
  int value = 0;
  void increment() => value++;
}

Future<void> main() async {
  final counter = Counter();
  for (var i = 0; i < 3; i++) {
    await Future.delayed(const Duration(milliseconds: 100));
    counter.increment();
  }
  print('Counted to \${counter.value}');
}
`,

  elixir: `defmodule Greeter do
  @moduledoc "Greets people."

  def greet(name), do: "Hello, #{name}!"

  def sum(list), do: Enum.reduce(list, 0, &+/2)
end

IO.puts(Greeter.greet("Elixir"))
IO.puts(Greeter.sum([1, 2, 3, 4, 5]))
`,

  elm: `module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

type Msg
    = Increment
    | Decrement

update : Msg -> Int -> Int
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1

view : Int -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , text (String.fromInt model)
        , button [ onClick Increment ] [ text "+" ]
        ]

main =
    Browser.sandbox { init = 0, update = update, view = view }
`,

  erlang: `-module(demo).
-export([factorial/1, main/0]).

factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).

main() ->
    lists:foreach(
        fun(N) -> io:format("~p! = ~p~n", [N, factorial(N)]) end,
        lists:seq(1, 5)
    ).
`,

  fsharp: `module Demo

let rec factorial n =
    if n <= 1 then 1 else n * factorial (n - 1)

let numbers = [ 1 .. 5 ]

numbers
|> List.iter (fun n -> printfn "%d! = %d" n (factorial n))

type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float

let area shape =
    match shape with
    | Circle radius -> System.Math.PI * radius ** 2.0
    | Rectangle (w, h) -> w * h
`,

  go: `package main

import (
	"fmt"
	"strings"
)

func reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func main() {
	words := []string{"go", "is", "fun"}
	fmt.Println(strings.Join(words, " "))
	fmt.Println(reverse("monaco"))
}
`,

  haskell: `module Main where

import Data.List (sortBy)
import Data.Ord (comparing)

data Shape
  = Circle Double
  | Rectangle Double Double
  deriving (Show)

area :: Shape -> Double
area (Circle r) = pi * r * r
area (Rectangle w h) = w * h

main :: IO ()
main = do
  let shapes = [Circle 1.0, Rectangle 2.0 3.0]
  mapM_ (print . area) shapes
  print (sortBy (comparing area) shapes)
`,

  haxe: `class Main {
  static function main() {
    var numbers = [1, 2, 3, 4, 5];
    var total = numbers.fold((n, acc) -> n + acc, 0);
    trace('Total: $total');

    var person = new Person("Ada", 36);
    trace(person.greet());
  }
}

class Person {
  public var name:String;
  public var age:Int;

  public function new(name:String, age:Int) {
    this.name = name;
    this.age = age;
  }

  public function greet():String {
    return 'Hello, $name ($age)';
  }
}
`,

  imba: `tag App
	def setup
		@count = 0

	def render
		<self>
			<h1> "Hello, Imba!"
			if @count > 0
				<p> "Clicked {@count} times"
			<button @click=@count++> "+1"

imba.mount <App>
`,

  java: `import java.util.List;
import java.util.stream.Collectors;

public class Demo {
    record Person(String name, int age) {}

    public static void main(String[] args) {
        var people = List.of(
            new Person("Ada", 36),
            new Person("Alan", 41),
            new Person("Grace", 45)
        );

        var names = people.stream()
            .filter(p -> p.age() > 38)
            .map(Person::name)
            .collect(Collectors.joining(", "));

        System.out.println(names);
    }
}
`,

  json5: `// JSON5 supports comments, unquoted keys and trailing commas
{
  name: 'monaco-languages',
  version: '0.3.6',
  keywords: [
    'monaco',
    'syntax-highlighting',
  ],
  metadata: {
    license: 'MIT',
    stars: 1_000,
  },
}
`,

  julia: `module Demo

struct Point
    x::Float64
    y::Float64
end

Base.:+(a::Point, b::Point) = Point(a.x + b.x, a.y + b.y)

function main()
    points = [Point(1.0, 2.0), Point(3.0, 4.0)]
    total = reduce(+, points)
    println("Sum: ", total)
    println("Distance: ", hypot(total.x, total.y))
end

end # module
`,

  kotlin: `data class Person(val name: String, val age: Int)

fun main() {
    val people = listOf(
        Person("Ada", 36),
        Person("Alan", 41),
        Person("Grace", 45),
    )

    people
        .filter { it.age > 38 }
        .sortedBy(Person::name)
        .forEach { println("\${it.name} is \${it.age}") }
}
`,

  lean: `import Mathlib.Tactic

def factorial : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * factorial n

theorem factorial_pos (n : Nat) : 0 < factorial n := by
  induction n with
  | zero => decide
  | succ k ih => exact Nat.mul_pos (Nat.succ_pos k) ih

#eval factorial 5
`,

  lua: `local function fibonacci(n)
  if n < 2 then
    return n
  end
  return fibonacci(n - 1) + fibonacci(n - 2)
end

local values = {}
for i = 1, 10 do
  table.insert(values, fibonacci(i))
end

print(table.concat(values, ", "))
`,

  minizinc: `include "alldifferent.mzn";

int: n = 8;

array[1..n] of var 1..n: queens;

constraint alldifferent(queens);
constraint alldifferent([queens[i] + i | i in 1..n]);
constraint alldifferent([queens[i] - i | i in 1..n]);

solve satisfy;

output [ show(queens) ];
`,

  nim: `import std/[sequtils, strutils]

type Person = object
  name: string
  age: int

proc greet(p: Person): string =
  &"Hello, {p.name} ({p.age})"

let numbers = (1..5).toSeq
echo numbers.mapIt(it * it).join(", ")

let ada = Person(name: "Ada", age: 36)
echo ada.greet()
`,

  objc: `#import <Foundation/Foundation.h>

@interface Greeter : NSObject
- (NSString *)greet:(NSString *)name;
@end

@implementation Greeter
- (NSString *)greet:(NSString *)name {
    return [NSString stringWithFormat:@"Hello, %@!", name];
}
@end

int main(int argc, const char *argv[]) {
    @autoreleasepool {
        Greeter *greeter = [[Greeter alloc] init];
        NSLog(@"%@", [greeter greet:@"Objective-C"]);
    }
    return 0;
}
`,

  objcpp: `#import <Foundation/Foundation.h>
#include <string>
#include <vector>

std::vector<std::string> names = {"Ada", "Alan", "Grace"};

int main() {
    @autoreleasepool {
        for (const auto &name : names) {
            NSString *greeting =
                [NSString stringWithFormat:@"Hello, %s!", name.c_str()];
            NSLog(@"%@", greeting);
        }
    }
    return 0;
}
`,

  pascal: `program Demo;

type
  TPoint = record
    X, Y: Integer;
  end;

function AddPoints(A, B: TPoint): TPoint;
begin
  Result.X := A.X + B.X;
  Result.Y := A.Y + B.Y;
end;

var
  P, Q, R: TPoint;
begin
  P.X := 1; P.Y := 2;
  Q.X := 3; Q.Y := 4;
  R := AddPoints(P, Q);
  WriteLn('Sum: (', R.X, ', ', R.Y, ')');
end.
`,

  php: `<?php

declare(strict_types=1);

enum Status: string
{
    case Active = 'active';
    case Inactive = 'inactive';
}

final class User
{
    public function __construct(
        public readonly string $name,
        public Status $status = Status::Active,
    ) {}
}

$users = [
    new User('Ada'),
    new User('Alan', Status::Inactive),
];

foreach ($users as $user) {
    printf("%s is %s\\n", $user->name, $user->status->value);
}
`,

  prolog: `parent(alice, bob).
parent(bob, carol).
parent(carol, dave).

ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).

sibling(X, Y) :-
    parent(P, X),
    parent(P, Y),
    X \\= Y.

% ?- ancestor(alice, dave).
% true.
`,

  purescript: `module Main where

import Prelude

import Data.Array (filter, range)
import Data.Foldable (sum)
import Effect (Effect)
import Effect.Console (log)

newtype Widget = Widget Int

derive newtype instance eqWidget :: Eq Widget
derive newtype instance ordWidget :: Ord Widget
derive newtype instance showWidget :: Show Widget

data Shape
  = Circle Number
  | Rectangle Number Number

area :: Shape -> Number
area (Circle r) = pi * r * r
area (Rectangle w h) = w * h

main :: Effect Unit
main = do
  let shapes = [Circle 1.0, Rectangle 2.0 3.0]
  log $ show $ map area shapes
  log $ show $ sum (filter (_ > 2.0) (map area shapes))
  log $ show $ map Widget (range 1 5)
`,

  python: `from dataclasses import dataclass
from typing import Iterable


@dataclass
class Point:
    x: float
    y: float

    def __add__(self, other: "Point") -> "Point":
        return Point(self.x + other.x, self.y + other.y)


def total(points: Iterable[Point]) -> Point:
    result = Point(0.0, 0.0)
    for point in points:
        result += point
    return result


if __name__ == "__main__":
    print(total([Point(1, 2), Point(3, 4)]))
`,

  r: `fibonacci <- function(n) {
  if (n < 2) return(n)
  a <- 0
  b <- 1
  for (i in seq_len(n - 1)) {
    tmp <- a + b
    a <- b
    b <- tmp
  }
  b
}

values <- vapply(0:10, fibonacci, numeric(1))
cat("Fibonacci:", values, "\\n")
cat("Mean:", mean(values), "\\n")
`,

  ripple: `import { track } from "ripple";

export component Counter() {
  let count = track(0);
  let double = track(() => @count * 2);

  <div class="container">
    <h2>{"Counter"}</h2>
    <p>{\`Count: \${@count}\`}</p>
    <p>{\`Double: \${@double}\`}</p>

    <button onClick={() => @count--}>{"-"}</button>
    <button onClick={() => @count++}>{"+"}</button>
  </div>
}
`,

  ruby: `class Greeter
  def initialize(name)
    @name = name
  end

  def greet
    "Hello, #{@name}!"
  end
end

greeter = Greeter.new("Ruby")
puts greeter.greet

%w[one two three].each_with_index do |word, index|
  puts "#{index + 1}: #{word.capitalize}"
end
`,

  rune: `struct Counter {
    value,
}

impl Counter {
    fn new() {
        Counter { value: 0 }
    }

    fn increment(self) {
        self.value += 1;
    }

    fn get(self) {
        self.value
    }
}

pub fn main() {
    let counter = Counter::new();
    counter.increment();
    counter.increment();
    println!("Count: {}", counter.get());
}
`,

  rust: `use std::collections::HashMap;

#[derive(Debug)]
struct Stats {
    counts: HashMap<String, usize>,
}

impl Stats {
    fn new() -> Self {
        Stats {
            counts: HashMap::new(),
        }
    }

    fn add(&mut self, word: &str) {
        *self.counts.entry(word.to_string()).or_insert(0) += 1;
    }
}

fn main() {
    let mut stats = Stats::new();
    for word in "the quick brown fox jumps over the lazy dog".split_whitespace() {
        stats.add(word);
    }
    println!("{:#?}", stats);
}
`,

  scala: `case class Person(name: String, age: Int)

object Demo:
  def factorial(n: BigInt): BigInt =
    if n <= 1 then 1 else n * factorial(n - 1)

  def main(args: Array[String]): Unit =
    val people = List(Person("Ada", 36), Person("Alan", 41))
    people.filter(_.age > 38).foreach(person => println(person.name))
    println(factorial(10))
`,

  scheme: `(define (factorial n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(define (map-square lst)
  (map (lambda (x) (* x x)) lst))

(define (main)
  (display "5! = ")
  (display (factorial 5))
  (newline)
  (display (map-square '(1 2 3 4)))
  (newline))

(main)
`,

  sql: `WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', sold_at) AS month,
    SUM(amount) AS total
  FROM sales
  WHERE sold_at >= '2024-01-01'
  GROUP BY 1
)
SELECT
  month,
  total,
  ROUND(total / SUM(total) OVER () * 100, 2) AS percent
FROM monthly_sales
ORDER BY month;
`,

  svelte: `<script>
  let title = "Svelte";
  let counter = 0;
  function increment() {
    counter += 1;
  }
</script>

<style>
  .container {
    text-align: center;
    font: 1em sans-serif;
  }
</style>

<div class="container">
  <h1>Hello, {title}!</h1>
  <p>You clicked {counter} times.</p>
  <button on:click={increment}>Click me</button>
</div>
`,

  swift: `import Foundation

struct Point: Equatable {
    var x: Double
    var y: Double

    static func + (lhs: Point, rhs: Point) -> Point {
        Point(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }
}

enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)

    var area: Double {
        switch self {
        case .circle(let radius):
            return .pi * radius * radius
        case .rectangle(let width, let height):
            return width * height
        }
    }
}

let shapes: [Shape] = [.circle(radius: 2), .rectangle(width: 3, height: 4)]
shapes.forEach { print($0.area) }
`,

  vbnet: `Imports System
Imports System.Collections.Generic
Imports System.Linq

Module Program
    Class Person
        Public Property Name As String
        Public Property Age As Integer
    End Class

    Sub Main()
        Dim people As New List(Of Person) From {
            New Person With {.Name = "Ada", .Age = 36},
            New Person With {.Name = "Alan", .Age = 41}
        }

        For Each person In people.Where(Function(p) p.Age > 38)
            Console.WriteLine($"{person.Name} is {person.Age}")
        Next
    End Sub
End Module
`,

  vue: `<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
.counter {
  padding: 1rem;
}
</style>
`,

  wat: `(module
  (func $fib (export "fib") (param $n i32) (result i32)
    (if (result i32)
      (i32.lt_s (local.get $n) (i32.const 2))
      (then (local.get $n))
      (else
        (i32.add
          (call $fib (i32.sub (local.get $n) (i32.const 1)))
          (call $fib (i32.sub (local.get $n) (i32.const 2)))
        )
      )
    )
  )

  (func (export "main") (result i32)
    (call $fib (i32.const 10))
  )
)
`,

  zig: `const std = @import("std");

const Point = struct {
    x: f64,
    y: f64,

    pub fn add(self: Point, other: Point) Point {
        return .{ .x = self.x + other.x, .y = self.y + other.y };
    }
};

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    const a = Point{ .x = 1.0, .y = 2.0 };
    const b = Point{ .x = 3.0, .y = 4.0 };
    const c = a.add(b);
    try stdout.print("Sum: ({d}, {d})\\n", .{ c.x, c.y });
}
`,
};
