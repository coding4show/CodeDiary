#lang racket
(define (good-enough? x guess) (<= (abs (- x (* guess guess))) 0.001))
(define (sqrt-iter x guess) (if (good-enough? x guess) guess (sqrt-iter x (/ (+ guess (/ x guess)) 2))))
(define (sqrt x) (sqrt-iter x 1.0))

(sqrt 2)
(sqrt 4)
(sqrt 9)
