const songSchema = new Schema(
    {
      title: { type: String, required: true },
      artist: { type: String, required: true },
      genre: String,
      duration: String, // Example: '3:45'
      playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    },
    { timestamps: true }
  );