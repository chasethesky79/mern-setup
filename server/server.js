import express from 'express';
import devBundle from './devBundle'

const express = express();
devBundle.compile(app);