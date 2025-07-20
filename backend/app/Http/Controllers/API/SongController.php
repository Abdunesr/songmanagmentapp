<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongController extends Controller
{
    
    public function index()
    {
        $songs = Song::all();
        return response()->json([
            'success' => true,
            'message' => 'Songs retrieved successfully',
            'data' => $songs
        ]);
    }

  
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'artist' => 'required',
            'album' => 'required',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $song = Song::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Song created successfully',
            'data' => $song
        ], 201);
    }

   
    public function show(Song $song)
    {
        return response()->json([
            'success' => true,
            'message' => 'Song retrieved successfully',
            'data' => $song
        ]);
    }

    
    public function update(Request $request, Song $song)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'artist' => 'required',
            'album' => 'required',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $song->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Song updated successfully',
            'data' => $song
        ]);
    }

   
    public function destroy(Song $song)
    {
        $song->delete();

        return response()->json([
            'success' => true,
            'message' => 'Song deleted successfully',
            'data' => null
        ], 204);
    }
}